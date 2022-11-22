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
            required: [true, 'Please add a text value']
        },
        type: {
            type: String,
            required: [true, 'Please add instrument type']
        },
        onLoan: {
            type: Boolean,
            required: [true]
        },

    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Instrument', instrumentSchema)