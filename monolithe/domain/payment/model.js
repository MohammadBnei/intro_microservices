const is = require('is_js')
const { v4: uuidv4 } = require('uuid');
const { listProducts } = require('../../services/product');
const { listUsers } = require('../../services/user');
const payments = []

const paymentCreator = async (data) => {
    const { buyerId, productId } = data

    if (is.empty(buyerId) || is.empty(productId)) {
        throw new Error('Wrong data for payment')
    }

    const user = await listUsers(buyerId)
    const product = await listProducts(productId)

    if (!user?.id || !product?.id) {
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