const fetch = require('node-fetch')

const listUsers = async (id) => {
    // Fetch user data
    const res = await fetch(`http://user-api:3000/users/${id ? id : ''}`)

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

module.exports = {
    listUsers
}