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

router.post('/', async (req, res) => {
  const data = req.body

  try {
    const product = await createProduct(data)

    res.send({ product })
  } catch (error) {
    res.send({ error: 'Something went wrong' })
  }
})

module.exports = router;
