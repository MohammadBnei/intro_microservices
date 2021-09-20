const { v4: uuidv4 } = require('uuid');
const payments = []

const paymentCreator = (data) => {
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