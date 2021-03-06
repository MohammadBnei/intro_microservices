var express = require('express');
const is = require('is_js')
const { createPayment, listPayments } = require('../domain/payment');
var router = express.Router();

/* GET payments listing. */
router.get('/', function (req, res, next) {
  res.send(listPayments());
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params

  if (is.empty(id)) {
    res.send({ err: 'Id not defined' })
    return
  }

  res.send(listPayments(id));
});

router.post('/', (req, res) => {
  const data = req.body
  console.log({ data })

  const payment = createPayment(data)

  res.send({ payment })
})

module.exports = router;
