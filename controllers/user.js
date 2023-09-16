const {v4: uuidv4} = require("uuid")
const userModel = require('../models/userModel')
const { setUser } = require("../service/auth")

const signUp = async (req, res) => {
    const {name, email, password} = req.body
    const mail = await userModel.findOne({email})
    if(mail) return res.render('signup', {
        msg: 'Email already registered!'
    })
    const result = await userModel.create({
        name:name,
        email:email,
        password: password
    })
    console.log(result)
    return res.render('signup', {
        user: result
    });
}

const loginUser = async (req, res) =>{
    const {email, password} = req.query
    console.log("This is request body: ", req.query, email, password)
    const user = await userModel.findOne({email, password})
    if(!user) return res.render('login', {msg: "Incorrect Email or Password!"})
    
    const sessionId = setUser(user)
    res.cookie("uid", sessionId);
    return res.redirect('/api/url')
}

const logoutUser = async (req, res) => {
    res.clearCookie('uid');
    return res.redirect('/');
}

module.exports = {signUp, loginUser, logoutUser}