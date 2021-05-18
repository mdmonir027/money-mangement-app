const { body } = require('express-validator');

const validation = {};

validation.createValidator = [
  body('amount')
    .not()
    .isEmpty()
    .withMessage('Please enter a amount')
    .isNumeric()
    .withMessage('Please enter a correct amount'),
  body('type').not().isEmpty().withMessage('Please enter a type'),
];
validation.updateValidator = [
  body('amount')
    .not()
    .isEmpty()
    .withMessage('Please enter a amount')
    .isNumeric()
    .withMessage('Please enter a correct amount'),
  body('type').not().isEmpty().withMessage('Please enter a type'),
];

module.exports = validation;
