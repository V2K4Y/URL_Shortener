const express = require("express")

const router = express.Router()

router.get('/', async (req, res) => {
    if(req.user) return res.redirect('/api/url');
    return res.redirect('/login')
})

router.get('/signup', (req, res)=>{
    if(req.user) return res.redirect('/api/url');
    return res.render('signup')
})

router.get('/login', (req, res) =>{
    if(req.user) return res.redirect('/api/url');
    return res.render('login')
})

module.exports = router;