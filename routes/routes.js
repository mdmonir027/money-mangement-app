const userRoutes = require('../routes/userRoutes');
const transactionRoutes = require('./transactionRoutes');

const routes = [
  {
    path: '/user',
    handler: userRoutes,
  },
  {
    path: '/transaction',
    handler: transactionRoutes,
  },
];

module.exports = (app) => {
  routes.forEach((route) => {
    app.use('/api' + route.path, route.handler);
  });
};
