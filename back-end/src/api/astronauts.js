const { Router } = require('express');
const AstronautsService = require('../services/AstronautsService')

const astronautsService = new AstronautsService()

const router = Router();

router.post('/', async (req, res) => {
    try {
        const astronaut = await astronautsService.create(req.body);
        return res.json({status: 200, data: astronaut});
    } catch (error) {
        if (process.env.NODE_ENV === 'dev') {
            console.log(`🔴 ${error}`)
        }
        return res.json({status: 401, data: "Error for add Astronauts"});
    }
});

router.get('/', async (req, res) => {
    try {
        const astronaut = await astronautsService.find();
        return res.json({status: 200, data: astronaut});
    } catch (error) {
        if (process.env.NODE_ENV === 'dev') {
            console.log(`🔴 ${error}`)
        }
        return res.json({status: 401, data: "Error for listing Astronauts"});
    }
});

router.get('/by-id/:id', async (req, res) => {
    try {
        const astronaut = await astronautsService.findOneById(req.params.id);
        if (!astronaut)
            throw "Astronot doesn't exist"
        return res.json({status: 200, data: astronaut});
    } catch (error) {
        if (process.env.NODE_ENV === 'dev') {
            console.log(`🔴 ${error}`)
        }
        return res.json({status: 401, data: "Astronaut doesn't exist"});
    }
});

router.put('/by-id/:id', async (req, res) => {
    try {
        const astronaut = await astronautsService.updateWithId(req.params.id, req.body);
        return res.json({status: 200, data: astronaut});
    } catch (error) {
        if (process.env.NODE_ENV === 'dev') {
            console.log(`🔴 ${error}`)
        }
        return res.json({status: 401, data: "Error for listing Astronauts"});
    }
});

router.get('/find/paginate', async (req, res) => {
    try {
        const astronaut = await astronautsService.findWithPagination(req.query.page)
        if (astronaut.length < 1)
            throw "No astronaut with this listing"
        return res.json({status: 200, data: astronaut});
    } catch (error) {
        if (process.env.NODE_ENV === 'dev') {
            console.log(`🔴 ${error}`)
        }
        return res.json({status: 401, data: "Error for listing Astronauts"});
    }
});

router.get('/findByCountry', async (req, res) => {
    try {
        const nbCountry = await astronautsService.findByCountry(req.query.country)
        if (nbCountry.length < 1)
            throw "No astronaut with this listing"
        return res.json({status: 200, data: nbCountry});
    } catch (error) {
        if (process.env.NODE_ENV === 'dev') {
            console.log(`🔴 ${error}`)
        }
        return res.json({status: 401, data: "Error for listing Astronauts"});
    }
});


module.exports = router