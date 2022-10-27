const { mongoose } = require("mongoose");
const Astronaut = require ('../models/astronaut')

const InitMongoose = async (mongoUrl) => {
    try {
        await mongoose.connect(mongoUrl);
    } catch (e) {
        console.log('Error', e)
    }
}

module.exports = InitMongoose 