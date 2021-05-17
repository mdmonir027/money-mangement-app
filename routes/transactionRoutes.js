const router = require('express').Router();

const {
  index,
  create,
  show,
  update,
  remove,
} = require('../controller/transactionController');

router.get('/', index);
router.post('/', create);
router.get('/:transactionId', show);
router.put('/:transactionId', update);
router.delete('/:transactionId', remove);

module.exports = router;
