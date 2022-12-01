const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const path = require('path')
const {upload} = require('../middleware/multerMiddleware')

const uploadFile = asyncHandler(async(req, res) => {
    if(!req.file){
        res.status(401)
        throw new Error('File not provided')
    }
    res.status(200).json(req.file)
})

const getFile = asyncHandler(async(req, res) => {
    res.sendFile(path.join(__dirname, `../upload/${req.params.name}`))
})

module.exports = {
    uploadFile,
    getFile,
}