const { body } = require('express-validator');
const User = require('../models/User');

const validator = {};

validator.userRegisterValidator = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Please enter a name')
    .isLength({ min: 6, max: 50 })
    .withMessage('Please enter a name between 6 to 50 chars')
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .custom(async (email) => {
      const userData = await User.findOne({ email });
      if (userData) {
        throw new Error('Email is already exists!');
      }
      return true;
    })
    .normalizeEmail(),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Please enter a password')
    .isLength({ min: 6, max: 24 })
    .withMessage('Please enter a password between 6 to 24 chars'),
  body('confirmPassword')
    .not()
    .isEmpty()
    .withMessage('Please confirm password')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Password didn't matched!");
      }
      return true;
    }),
];

validator.userLoginValidator = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').not().isEmpty().withMessage('Please enter a password'),
];

module.exports = validator;
