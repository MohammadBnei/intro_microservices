const is = require('is_js')
const fetch = require('node-fetch')
const { paymentCreator, payments } = require('./model')

const PRODUCT_URL = process.env.PRODUCT_URL
const USER_URL = process.env.USER_URL

const createPayment = async (data) => {
    const { buyerId, productId, payed } = data

    if (is.empty(buyerId) || is.empty(productId)) {
        throw new Error('Wrong data for payment')
    }

    if (is.empty(await getUser(buyerId))) {
        throw new Error('Buyer or Product not found')
    }

    if (!await canBuy(payed, productId)) {
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

const canBuy = async (payed, productId) => {
    return await (await fetch(PRODUCT_URL + 'canbuy', {
        method: 'POST',
        body: JSON.stringify({
            payed, productId
        }),
        headers: { 'Content-Type': 'application/json' }
    })).json()
}

const bought = async (productId) => {
    return await fetch(PRODUCT_URL + 'bought', {
        method: 'POST',
        body: JSON.stringify({
            productId
        }),
        headers: { 'Content-Type': 'application/json' },
    })
}

const getUser = async userId => {
    return await (await fetch(USER_URL + userId)).json()
}