const userRoutes = require('../routes/userRoutes');

const routes = [
  {
    path: '/user',
    handler: userRoutes,
  },
];

module.exports = (app) => {
  routes.forEach((route) => {
    app.use('/api' + route.path, route.handler);
  });
};
