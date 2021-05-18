// dependencies
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// custom dependencies
const setMiddleware = require('./middleware/middleware');
const setRoutes = require('./routes/routes');
const passportInstance = require('./middleware/passport/passport');
// scaffolding
const app = express();

setMiddleware(app);

app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);
setRoutes(app);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Your message is here',
  });
});

const PORT = process.env.PORT || 4000;

mongoose
  .connect('mongodb://localhost:27017/mmt', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
