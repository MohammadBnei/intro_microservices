var express = require('express');
const is = require('is_js')
const { createProduct, listProducts } = require('../domain/product');
var router = express.Router();

/* GET products listing. */
router.get('/', function (req, res, next) {
  res.send(listProducts());
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params

  if (is.empty(id)) {
    res.send({ err: 'Id not defined' })
    return
  }

  res.send(listProducts(id));
});

router.post('/', (req, res) => {
  const data = req.body
  console.log({ data })

  const product = createProduct(data)

  res.send({ product })
})

module.exports = router;
