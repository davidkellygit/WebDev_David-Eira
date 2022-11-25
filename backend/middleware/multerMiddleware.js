const multer = require('multer')
const path = require('path')
const fs = require('fs-extra')
const asyncHandler = require ('express-async-handler')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = 'backend/upload/'
        //fs.mkdirSync(path)
        cb(null, path)
    },
    filename: (req, file, cb) => {
        cb(null, (Date.now() + path.extname(file.originalname)))
    }
})

const upload = multer({storage: storage})

module.exports = {
    upload
}