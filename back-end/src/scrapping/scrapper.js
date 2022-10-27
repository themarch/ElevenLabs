const fs = require('fs')
const axios = require('axios')

const main = async () => {
    const file = fs.readFileSync('../../public/astronaut.csv', 'utf-8')
    const line = file.split('\n')
    let dataInserted;
    const planete = ["Duck Invaders", "Raccoons of Asgard", "Donut Factory", "Schizo Cats"]
    for (const element of line) {
        const lineSplitted = element.split('"')
        const nbAleatoire = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
        const flightTimeSplitted = lineSplitted[11].replace(/^"(.*)"$/, '$1').split(':')
        const flightTimeMinute = flightTimeSplitted[0]*24 + (flightTimeSplitted[1]/24) + (flightTimeSplitted[2]/1440)
        if (parseInt(lineSplitted[9].replace(/^"(.*)"$/, '$1'))) {
            dataInserted = {
                name: lineSplitted[1].replace(/^"(.*)"$/, '$1'),
                country: lineSplitted[3].replace(/^"(.*)"$/, '$1'),
                gender: lineSplitted[5].replace(/^"(.*)"$/, '$1'),
                flights: lineSplitted[7].replace(/^"(.*)"$/, '$1'),
                totalFlights: parseInt(lineSplitted[9].replace(/^"(.*)"$/, '$1')),
                flightTime: flightTimeMinute ? flightTimeMinute.toFixed(2) : "",
                planete: planete[nbAleatoire]
            }
            await axios.post(`http://localhost:9000/astronauts`, dataInserted)
        }
    }
}

main()
