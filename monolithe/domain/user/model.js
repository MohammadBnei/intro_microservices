const is = require('is_js')
const { v4: uuidv4 } = require('uuid');
const users = [{
    "id": "8e066bda-83d4-438c-be47-743f8bbc32ac",
    "name": "moha",
    "email": "moha@med.com",
    "password": "pss"
}, {
    "id": "edf5ac05-8aa7-4ecc-8158-fd1e3bddd308",
    "name": "ben",
    "email": "ben@ten.com",
    "password": "pss"
}, {
    "id": "ebaf95f1-ee28-4816-bf34-d48bdcfef201",
    "name": "mira",
    "email": "mira@mira.com",
    "password": "pss"
}]

const userCreator = (data) => {
    const { name, email, pass } = data

    if (is.not.alphaNumeric(name) || is.not.email(email) || is.not.alphaNumeric(pass)) {
        throw new Error('Wrong data for user')
    }

    const user = {
        id: uuidv4(),
        ...data
    }

    Object.freeze(user)

    users.push(user)

    return user
}

module.exports = {
    userCreator,
    users
}