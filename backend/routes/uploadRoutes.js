const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')
const {upload}  = require('../middleware/multerMiddleware')
const {uploadFile, getFile} = require('../controllers/uploadController')

router.post('/', protect, upload.single('file'), uploadFile)
router.get('/:name', getFile)

module.exports = router