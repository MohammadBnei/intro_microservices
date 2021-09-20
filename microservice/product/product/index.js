const is = require('is_js')
const fetch = require('node-fetch')
const { productCreator, products, updateProduct } = require('./model')

const USER_URL = process.env.USER_URL

const createProduct = async (data) => {
    const { userId } = data
    await verifyUser(userId)

    const product = productCreator(data)
    return product
}

const listProducts = (id) => {
    return id ? products.find(({ id: _id }) => id === _id) : products
}

const canBuy = (balance = 0, productId) => {
    const product = products.find(({ id }) => id === productId)
    if (is.not.existy(balance) || is.not.existy(product) || balance < product.price) {
        return false
    }

    return true
}

const bought = (productId) => {
    const product = products.find(({ id }) => id === productId)

    updateProduct(productId, { ...product, quantity: product.quantity - 1 })
}

module.exports = {
    createProduct,
    listProducts,
    canBuy,
    bought
}

const verifyUser = async (userId) => {
    try {
        const user = await (await fetch(USER_URL + userId)).json()

        if (!user) throw new Error()
    } catch (error) {
        console.log(error)
        throw new Error('Could not verify user')
    }
}