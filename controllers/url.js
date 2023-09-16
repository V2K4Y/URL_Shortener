const shortUniqueId = require('short-unique-id')
const urlModel = require('../models/urlModule')

const generateNewShortUrl = async (req, res) => {
    if(!req.body || !req.body.url) return res.status(400).json({error: "Bad request URL is required !"})
    const uid = new shortUniqueId({length: 8})
    const user = await urlModel.create({
        shortId: uid.rnd(),
        redirectUrl: req.body.url,
        visitHistory: [],
        createdBy: req.user._id
    })
    const result = await urlModel.find({createdBy: req.user._id})
    return res.status(200).render('home', {
        id: user,
        urls: result,
    })
    // return res.status(200).json({msg: "success!", id: user.shortId})
}

const redirectToUrl = async ( req, res) => {
    const url = req.params.url
    const model = await urlModel.findOneAndUpdate({shortId: url}, {$push: {visitHistory: {timestamp: new Date()}}})
    res.redirect(model.redirectUrl)
} 

const showAnalytics = async (req, res) => {
    const shortId = req.params.url
    const result = await urlModel.findOne({shortId})
    res.send(`Total click: ${result.visitHistory.length}\n Details:\n ${result.visitHistory}`)
}

const staticDetail = async (req, res) => {
    if(!req.user) return res.redirect('/')
    const allURL = await urlModel.find({ createdBy: req.user._id })
    return res.render('home', {
        urls: allURL
    })
}

const deleteUrl = async (req, res) => {
    console.log("ShortId: ", req.body)
    await urlModel.findOneAndDelete({shortId: req.body.shortUrl})
    const urls = await urlModel.find({})
    return res.status(200).render('home', {urls: urls})
}

module.exports = {generateNewShortUrl, redirectToUrl, showAnalytics, staticDetail, deleteUrl};