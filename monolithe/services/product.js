const fetch = require('node-fetch')

const listProducts = async (id) => {
    // Fetch user data
    const res = await fetch(`http://product-api:3000/products/${id ? id : ''}`)

    if (!res.ok) {
        return null
    }

    try {
        const data = await res.json();
        return data
    } catch (error) {
        console.log({ error })
        return null
    }
}

const canBuy = async (payed, productId) => {
    const product = await listProducts(productId)

    if (!product) {
        return false
    }

    if (product.quantity < 1) {
        return false
    }

    if (payed > product.price) {
        return false
    }

    return true
}

const bought = async (productId) => {
    const product = await listProducts(productId)

    const res = await fetch(`http://product-api:3000/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...product,
            quantity: product.quantity - 1
        })
    })

    return res.ok
}

module.exports = {
    listProducts,
    canBuy,
    bought
}