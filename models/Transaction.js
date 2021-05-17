const { Schema, model } = require('mongoose');

const transactionSchema = new Schema(
  {
    amount: {
      required: true,
      type: Number,
    },
    type: {
      required: true,
      type: String,
    },
    note: String,
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const transaction = model('Transaction', transactionSchema);

module.exports = transaction;
