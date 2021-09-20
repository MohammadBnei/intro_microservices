const { canBuy, bought } = require('../product')
const { updateProduct } = require('../product/model')
const { paymentCreator, payments } = require('./model')

const createPayment = (data) => {
    const { payed, productId } = data
    if (!canBuy(payed, productId)) {
        throw new Error('Can\'t buy')
    }

    const payment = paymentCreator(data)
    bought(productId)
    return payment
}

const listPayments = (id) => {
    return id ? payments.find(({ id: _id }) => id === _id) : payments
}

module.exports = {
    createPayment,
    listPayments
}