const mongoose = require('mongoose')

const astronautModel = new mongoose.Schema(
    {
        name: {
            required: true,
            unique: true,
            type: mongoose.Schema.Types.String,
        },
        country: {
            required: false,
            type: mongoose.Schema.Types.String, 
        },
        gender: {
            required: false,
            type: mongoose.Schema.Types.String,
        },
        flights: {
            required: false,
            type: mongoose.Schema.Types.String,
        },
        totalFlights: {
            required: false,
            type: mongoose.Schema.Types.Number,
        },
        flightTime: {
            required: false,
            type: mongoose.Schema.Types.Number,
        },
        planete: {
            required: false,
            type: mongoose.Schema.Types.String,
        }
    }, { timestamps: true }
)

const model = mongoose.model('astronaut', astronautModel)
module.exports = model