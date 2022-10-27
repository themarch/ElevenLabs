const Astronaut = require("../models/astronaut")

class AstronautsService {
    constructor() {
    }

    /**
     * Insert data into Astronauts 
     * @returns Astronauts
    */
    async create(data) {
        if (!data)
            throw "Please pass some data"
        const astronautExist = await this.findOneByName(data.name)
        if (astronautExist)
            throw "Astonaut already exist in our database"
        return await Astronaut.create(data)
    }

    /**
     * Find all Astronauts
     * @returns Array of Astronauts
    */
    async find() {
        return await Astronaut.find().sort({"createdAt": -1})
    }

    /**
     * Find Astronauts with pagination
     * @param {String} page - page, limit by 10
     * @returns Array of Astronauts limit 10 by 10
    */
    async findWithPagination(page) {
        return await Astronaut.find().limit(10).skip((page -1)*10)
    }

    /**
     * Find Astronaut with name
     * @param {String} name - name of astronauts
     * @returns Astronaut
    */
    async findOneByName(name) {
        return await Astronaut.findOne({name})
    }

    /**
     * Find Astronaut with mongodb id
     * @param {ObjectId} id - ObjectId of astronauts
     * @returns Astronaut
    */
    async findOneById(id) {
        return await Astronaut.findOne({"_id": id})
    }

    /**
     * Update Astronaut with mongodb id
     * @param {String} id - ObjectId of astronauts
     * @param {Object} data - Object to update with key, value
     * @returns Astronaut updated
    */
    async updateWithId(id, data) {
        if (!id || !data)
            throw "Please pass some id and data"
        let query = {
            $set : {}
        }
        Object.entries(data).map(item => {
            query.$set[item[0]] = item[1]
        })
        const dataAstronaut = await Astronaut.findOneAndUpdate({_id: id}, query, {returnOriginal: false})
        if (!dataAstronaut)
            throw "Astronaut doesn't exist"
        return dataAstronaut
    }

    /**
     * Find Astronauts with Country
     * @param {String} country - ObjectId of astronauts
     * @returns Astronauts from country
    */
    async findByCountry(country) {
        return await Astronaut.find({country: country})
    }

    /**
     * Update Astronaut with name
     * @param {String} name - name of astronaut
     * @param {Object} data - Object to update with key, value
     * @returns Astronaut updated
    */
    async updateWithName(name, data) {
        if (!name || !data)
            throw "Please pass some name and data"
        let query = {
            $set : {}
        }
        Object.entries(data).map(item => {
            query.$set[item[0]] = item[1]
        })
        const dataAstronaut = await Astronaut.findOneAndUpdate({name: name}, query, {returnOriginal: false})
        if (!dataAstronaut)
            throw "Astronaut doesn't exist"
        return dataAstronaut
    }

}

module.exports = AstronautsService