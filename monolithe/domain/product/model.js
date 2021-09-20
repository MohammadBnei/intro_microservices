const is = require('is_js')
const { v4: uuidv4 } = require('uuid');
const { listUsers } = require('../user');

const products = [{
    "id": "1450861b-fb56-4e36-a4d4-7213036a2c98",
    "name": "escabeau",
    "price": 23.4,
    "userId": "8e066bda-83d4-438c-be47-743f8bbc32ac",
    "quantity": 4
}, {
    "id": "0c17d96a-4125-489a-b35b-8e96ee4931e9",
    "name": "pirate",
    "price": 10,
    "userId": "edf5ac05-8aa7-4ecc-8158-fd1e3bddd308",
    "quantity": 2
}, {
    "id": "29dcd2ff-b714-4b41-90b2-b392d700817c",
    "name": "patate",
    "price": 2,
    "userId": "ebaf95f1-ee28-4816-bf34-d48bdcfef201",
    "quantity": 15
}]

const productCreator = (data) => {
    const { name, price, userId, quantity } = data

    if (is.not.alphaNumeric(name) || is.not.number(price) || is.not.number(quantity) || is.empty(listUsers(userId))) {
        throw new Error('Wrong data for product')
    }

    if (quantity < 0 || price < 0) {
        throw new Error('quantity or price below 0 !')
    }

    const product = {
        id: uuidv4(),
        ...data
    }

    Object.freeze(product)

    products.push(product)

    return product
}

const updateProduct = (productId, newData) => {
    const productPosition = products.findIndex(({ id }) => id === productId)
    products.splice(productPosition, 1)
    productCreator(newData)
}

module.exports = {
    productCreator,
    products,
    updateProduct
}