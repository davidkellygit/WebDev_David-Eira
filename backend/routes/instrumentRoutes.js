const express = require('express')
const router = express.Router()
const { getInstruments, getAllInstruments, setInstrument, updateInstrument, deleteInstrument } = require('../controllers/instrumentController')

const {protect} = require('../middleware/authMiddleware')


router.get('/', protect, getInstruments)
router.get('/all', getAllInstruments)

router.post('/', protect, setInstrument)

router.put('/:id', protect, updateInstrument)

router.delete('/:id', protect, deleteInstrument)




module.exports = router