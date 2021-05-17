// dependencies

const Transaction = require('../models/Transaction');
const User = require('../models/User');

// app scaffolding
const controller = {};

controller.index = async (req, res) => {
  const userId = req.user._id;
  try {
    const transactions = await Transaction.find({ author: userId });
    if (transactions.length > 0) {
      return res.status(200).json({
        message: `${transactions.length} transactions founded`,
        transactions,
      });
    }

    return res.status(204).json({
      message: 'No transactions found',
    });
  } catch (e) {
    console.log(e); // todo remove later
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

controller.create = async (req, res) => {
  const { amount, note, type } = req.body;
  const userId = req.user._id;

  const transactionInstance = new Transaction({
    amount,
    note,
    type,
    author: userId,
  });

  try {
    const transaction = await transactionInstance.save();

    const currentUser = { ...req.user };

    if (type === 'income') {
      currentUser.balance = currentUser.balance + amount;
      currentUser.income = currentUser.income + amount;
    } else if (type === 'expense') {
      currentUser.balance = currentUser.balance - amount;
      currentUser.expense = currentUser.expense + amount;
    }

    currentUser.transactions.unshift(transaction._id);

    await User.findByIdAndUpdate(transaction._id, { $set: currentUser });
    res.status(201).message({
      message: 'Transaction created successfully',
      result: { ...transaction },
    });
  } catch (e) {
    console.log(e); // todo remove later
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

controller.show = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.find({ _id: transactionId });
    if (transaction) {
      return res.status(200).json({
        transaction,
      });
    }
    return res.status(204).json({
      message: 'No transaction found',
    });
  } catch (e) {
    console.log(e); // todo remove later
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

controller.update = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      message: 'Transaction updated successfully',
      transaction: updatedTransaction,
    });
  } catch (e) {
    console.log(e); // todo remove later
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

controller.remove = async (req, res) => {
  const { transactionId } = req.params;

  try {
    await Transaction.findByIdAndRemove(transactionId);

    res.status(204).json({
      message: 'Transaction deleted successfully',
    });
  } catch (e) {
    console.log(e); // todo remove later
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = controller;
