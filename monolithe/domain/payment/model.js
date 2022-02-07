const is = require('is_js')
const { v4: uuidv4 } = require('uuid');
const { listUsers } = require('../../services/user');
const { listProducts } = require('../product');
const payments = []

const paymentCreator = async (data) => {
    const { buyerId, productId } = data

    if (is.empty(buyerId) || is.empty(productId)) {
        throw new Error('Wrong data for payment')
    }

    const user = await listUsers(buyerId)

    if (!user?.id || is.empty(listProducts(productId))) {
        throw new Error('Buyer or Product not found')
    }

    const payment = {
        id: uuidv4(),
        date: Date.now(),
        ...data
    }

    Object.freeze(payment)

    payments.push(payment)

    return payment
}

module.exports = {
    paymentCreator,
    payments
}