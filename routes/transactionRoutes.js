const router = require('express').Router();
const {
  index,
  create,
  show,
  update,
  remove,
} = require('../controller/transactionController');
const authenticate = require('../middleware/passport/authenticate');
const {
  createValidator,
  updateValidator,
} = require('../validator/transactionValidator');

router.get('/', authenticate, index);
router.post('/', authenticate, createValidator, create);
router.get('/:transactionId', authenticate, show);
router.put('/:transactionId', authenticate, updateValidator, update);
router.delete('/:transactionId', authenticate, remove);

module.exports = router;
