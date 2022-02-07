const { userCreator, users } = require('./model')

const createUser = (data) => {
    const user = userCreator(data)
    return user
}

const listUsers = (id) => {
    return id ? users.find(({id : _id}) => id === _id) : users 
}

module.exports = {
    createUser,
    listUsers
}