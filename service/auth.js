const jwt = require('jsonwebtoken')
const secret = "@$24*)vivek)$kumar@Yadav"


const setUser = (user) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret)
}

const getUser = (id) => {
    if(!id) return null
    try {
        return jwt.verify(id, secret)
    } catch (error) {
        return null
    }
}

module.exports = {setUser, getUser}