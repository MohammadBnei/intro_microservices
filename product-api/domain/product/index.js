const is = require('is_js')
const { productCreator, products, updateProduct } = require('./model')

const createProduct = async (data) => {
    const product = await productCreator(data)
    return product
}

const listProducts = (id) => {
    return id ? products.find(({ id: _id }) => id === _id) : products
}

const canBuy = (balance = 0, productId) => {
    const product = products.find(({ id }) => id === productId)
    console.log({ product, balance })
    if (is.not.existy(balance) || is.not.existy(product) || balance < product.price || product.quantity < 1) {
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