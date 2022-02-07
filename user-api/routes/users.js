var express = require('express');
const is = require('is_js')
const { createUser, listUsers } = require('../domain/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const users = listUsers()
  if (!users || users.length === 0) {
    res.status(404).send()
    return
  }

  res.send(users);
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params
  const user = listUsers(id)

  if (!id || !user) {
    res.status(404).send()
    return
  }

  res.send(user);
});

router.post('/', (req, res) => {
  const data = req.body
  console.log({ data })

  const user = createUser(data)

  res.send({ user })
})

module.exports = router;
