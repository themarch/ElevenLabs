const { mongoose } = require("mongoose");
const Astronaut = require ('../models/astronaut')

const InitMongoose = async (mongoUrl) => {
    try {
        await mongoose.connect(mongoUrl);
    } catch (e) {
        if (process.env.NODE_ENV === 'dev') {   
            console.log(`🔴 ${e}`)
        }
        console.log('Error with database connection')
    }
}

module.exports = InitMongoose 