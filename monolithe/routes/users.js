var express = require('express');
const is = require('is_js')
const { createUser, listUsers } = require('../domain/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(listUsers());
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params
  console.log({ id })

  if (is.empty(id)) {
    res.send({ err: 'Id not defined' })
    return
  }

  res.send(listUsers(id));
});

router.post('/', (req, res) => {
  const data = req.body
  console.log({ data })

  const user = createUser(data)

  res.send({ user })
})

module.exports = router;
