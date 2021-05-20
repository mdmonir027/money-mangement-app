// dependencies
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const errorValidationFormatter = require('../utils/errorValidationFormatter');

// app scaffolding
const controller = {};

controller.index = async (req, res) => {
  const userId = req.user._id;
  try {
    const transactions = await Transaction.find({ author: userId });
    if (transactions.length > 0) {
      return res.status(200).json({
        message: `${transactions.length} transactions founded`,
        transactions: transactions.reverse(),
      });
    }

    return res.status(200).json({
      message: 'No transactions found',
      transactions: [],
    });
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

controller.create = async (req, res) => {
  const errors = validationResult(req).formatWith(errorValidationFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  const { amount, note, type } = req.body;
  const userId = req.user._id;

  const transactionInstance = new Transaction({
    amount: Number(amount),
    note,
    type,
    author: userId,
  });

  try {
    const transaction = await transactionInstance.save();

    const currentUser = { ...req.user._doc };

    if (type === 'income') {
      currentUser.balance = currentUser.balance + amount;
      currentUser.income = currentUser.income + amount;
    } else if (type === 'expense') {
      currentUser.balance = currentUser.balance - amount;
      currentUser.expense = currentUser.expense + amount;
    }

    currentUser.transactions.unshift(transaction._id);

    await User.findByIdAndUpdate(
      currentUser._id,
      { $set: currentUser },
      { new: true }
    );
    res.status(201).json(transaction);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

controller.show = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.findOne({ _id: transactionId });
    if (transaction) {
      return res.status(200).json(transaction);
    }
    return res.status(204).json({
      message: 'No transaction found',
    });
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

controller.update = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const { note, amount, type } = req.body;
    const transaction = await Transaction.findById(transactionId);
    const user = await User.findById(req.user._id);

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { $set: { note, type, amount } },
      { new: true }
    );

    let { balance, income, expense } = user;

    if (type === 'income' && transaction.type !== 'income') {
      expense = expense - amount;
      income = income + amount;
      balance = income - expense;
    } else if (type === 'expense' && transaction.type !== 'expense') {
      income = income - amount;
      expense = expense + amount;
      balance = income - expense;
    }

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { income, balance, expense },
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Transaction updated successfully',
      transaction: updatedTransaction,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

controller.remove = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.findById(transactionId);
    const user = await User.findById(req.user._id);

    let { balance, income, expense } = user;
    if (transaction.type === 'income') {
      balance = balance - transaction.amount;
      income = income - transaction.amount;
    } else if (transaction.type === 'expense') {
      balance = balance + transaction.amount;
      expense = expense - transaction.amount;
    }

    await Transaction.findByIdAndRemove(transactionId);
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { transactions: transactionId },
      $set: { income, expense, balance },
    });

    res.status(204).json({
      message: 'Transaction deleted successfully',
    });
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = controller;
