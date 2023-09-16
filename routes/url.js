const express = require("express")
const {generateNewShortUrl, redirectToUrl, showAnalytics, staticDetail, deleteUrl} = require("../controllers/url")


const router = express.Router()

router.route('/').post(generateNewShortUrl).get(staticDetail).delete(deleteUrl)

router.route('/:url').get(redirectToUrl)

router.get('/analytics/:url', showAnalytics)

module.exports = router;