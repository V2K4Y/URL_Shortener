const express = require('express')

const {signUp, loginUser, logoutUser} = require('../controllers/user')
const router = express.Router();

router.post('/', signUp)
router.get('/', loginUser)
router.get('/logout', logoutUser)

module.exports = router