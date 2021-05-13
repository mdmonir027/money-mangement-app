const router = require('express').Router();

const { register, login } = require('../controller/userController');
const {
  userRegisterValidator,
  userLoginValidator,
} = require('../validator/userValidator');

router.post('/login', userLoginValidator, login);
router.post('/register', userRegisterValidator, register);

module.exports = router;
