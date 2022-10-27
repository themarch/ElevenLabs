const Astronaut = require("../models/astronaut")

class StatsService {
    constructor() {

    }

    /**
     * Get nb of Astronaut by planets
     * @returns Number of Astronauts by planets
    */
    async nbByPlanete() {
        const planete = ["Duck Invaders", "Raccoons of Asgard", "Donut Factory", "Schizo Cats"]
        let dataPlanete = {}
        for (const data of planete) {
            dataPlanete[data] = await Astronaut.count({"planete": data})
        }
        return dataPlanete
    }

    /**
     * Get nb of Astronaut by planet
     * @param {String} planete - name of planete
     * @returns Number of Astronauts for this planet
    */
    async nbByPrecisePlanete(planete) {
        let resultsPlanete = {}
        const data = await Astronaut.count({"planete": planete})
        resultsPlanete[planete] = data
        return (resultsPlanete)
    }

    /**
     * Get nb of Astronaut by gender
     * @returns Number of Astronauts by gender
    */
    async nbByGender() {
        const gender = ["Woman", "Man"]
        let dataGender = {}
        for (const data of gender) {
            dataGender[data] = await Astronaut.count({"gender": data})
        }
        return dataGender
    }

    /**
     * Get nb of average flight
     * @returns Number of average flight
    */
    async averageNbFlights() {
        return (
            await Astronaut.aggregate(
                [
                    {
                    $group:
                        {
                            _id: "",
                            avgFlight: { $avg: "$totalFlights" }
                        }
                    }
                ]
            )   
        )
    }

    /**
     * Get nb of average time flight
     * @returns Number of average time flight
    */
    async averageTimeFlights() {
        const timeFlight = await Astronaut.aggregate(
                [
                    {
                    $group:
                        {
                            _id: "",
                            avgFlight: { $avg: "$flightTime" }
                        }
                    }
                ]
            )
        return timeFlight[0].avgFlight / 24 //Nb total in hours
    }

}

module.exports = StatsService