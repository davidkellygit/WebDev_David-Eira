const asyncHandler = require('express-async-handler')

const Instrument = require('../models/instrumentModel')
const User = require('../models/userModel')

// @desc    Get instruments
// @route   GET /api/instruments
// @access  Private
const getInstruments = asyncHandler(async (req, res) => {
    const instruments = await Instrument.find({ user: req.user.id })

    res.status(200).json(instruments)

})

// @desc    Get instruments
// @route   GET /api/instruments
// @access  Private
const getSheetByID = asyncHandler(async (req, res) => {
    const instruments = await Instrument.findOne({ _id: req.params.id })

    res.status(200).json(instruments)

})


// @desc    Get instruments
// @route   GET /api/instruments
// @access  Private
const getAllInstruments = asyncHandler(async (req, res) => {
    const instruments = await Instrument.find()

    res.status(200).json(instruments)

})


// @desc    Set instrument
// @route   POST /api/instruments
// @access  Private
const setInstrument = asyncHandler(async (req, res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const instrument = await Instrument.create({
        filename: req.body.filename,
        name: req.body.name,
        inst: req.body.inst,
        inst2: req.body.inst,
        onLoan: req.body.onLoan,
        user: req.user.id,
    })

    res.status(200).json({instrument})

})

// @desc    Update instrument
// @route   PUT /api/instruments/:ID
// @access  Private
const updateInstrument = asyncHandler(async (req, res) => {
    const goal = await Instrument.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Instrument not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
        
    } 

    // Make sure the logged in user matches the goal user
    if(instrument.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorised')

    }

    const updatedInstrument = await Instrument.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedInstrument)

})

// @desc    Delete instrument
// @route   DELETE /api/instruments/:id
// @access  Private
const deleteInstrument = asyncHandler(async (req, res) => {
    const instrument = await Instrument.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Instrument not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
        
    } 

    // Make sure the logged in user matches the goal user
    if(instrument.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorised')

    }

    

    await instrument.remove()

    res.status(200).json({ id: req.params.id })

})

module.exports = {
    getInstruments, 
    getSheetByID,
    getAllInstruments,
    setInstrument, 
    updateInstrument,
    deleteInstrument
}