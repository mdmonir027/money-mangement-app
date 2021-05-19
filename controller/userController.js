const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const errorFormatter = require('../utils/errorValidationFormatter');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const controller = {};

controller.login = async (req, res) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: 'Invalid Credentials',
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        error: 'Invalid Credentials',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        income: user.income,
        expense: user.expense,
      },
      'SECRET',
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login was successful',
      token: `Bearer ${token}`,
    });
  } catch (e) {
    console.log(e); // todo remove later
    res.status(500).json({
      error: 'Internal Server Error!',
    });
  }
};
controller.register = async (req, res) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  const { name, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 11);

    const userInstance = new User({
      name,
      email,
      password: hashPassword,
    });

    const createdUser = await userInstance.save();
    const user = { ...createdUser._doc };
    delete user.password;

    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: 'Internal Server Error!',
    });
  }
};

module.exports = controller;
