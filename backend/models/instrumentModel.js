const mongoose = require('mongoose')

const instrumentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectID,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: [true, 'Please add the name of your score']
        },
        inst: {
            type: String,
            required: [true, 'Please add instrumentation']
        },
        inst2: {
            type: String,
            required: [false, 'Please add additional instrumentation']
        },
        onLoan: {
            type: Boolean,
            required: [false],
            default: false,
        },

    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Instrument', instrumentSchema)