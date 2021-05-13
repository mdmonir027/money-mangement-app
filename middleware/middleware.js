const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const middlewareArray = [
  morgan('dev'),
  cors(),
  express.urlencoded({ extended: false }),
  express.json(),
];

module.exports = (app) => {
  middlewareArray.forEach((item) => {
    app.use(item);
  });
};
