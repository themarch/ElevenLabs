const { Router } = require('express');
const StatsService = require('../services/StatsService')

const statsService = new StatsService()

const router = Router();

router.get('/by-planete', async (req, res) => {
    try {
        const statsByPlanete = await statsService.nbByPlanete();
        return res.json({status: 200, data: statsByPlanete});
    } catch (error) {
        if (process.env.NODE_ENV === 'dev') {
            console.log(`🔴 ${error}`)
        }
        return res.json({status: 401, data: "Error for add Astronauts"});
    }
});

router.get('/by-precise-planete', async (req, res) => {
    try {
        const statsByPlanete = await statsService.nbByPrecisePlanete(req.body.planete);
        return res.json({status: 200, data: statsByPlanete});
    } catch (error) {
        if (process.env.NODE_ENV === 'dev') {
            console.log(`🔴 ${error}`)
        }
        return res.json({status: 401, data: "Error for add Astronauts"});
    }
});

router.get('/by-gender', async (req, res) => {
    try {
        const statsByPGender = await statsService.nbByGender();
        return res.json({status: 200, data: statsByPGender});
    } catch (error) {
        if (process.env.NODE_ENV === 'dev') {   
            console.log(`🔴 ${error}`)
        }
        return res.json({status: 401, data: "Error for add Astronauts"});
    }
});

router.get('/average-flight', async (req, res) => {
    try {
        const averageFlight = await statsService.averageNbFlights();
        return res.json({status: 200, data: averageFlight[0]});
    } catch (error) {
        if (process.env.NODE_ENV === 'dev') {   
            console.log(`🔴 ${error}`)
        }
        return res.json({status: 401, data: "Error for add Astronauts"});
    }
});

router.get('/average-time-flight', async (req, res) => {
    try {
        const averageTimeFlight = await statsService.averageTimeFlights();
        return res.json({status: 200, data: averageTimeFlight});
    } catch (error) {
        if (process.env.NODE_ENV === 'dev') {   
            console.log(`🔴 ${error}`)
        }
        return res.json({status: 401, data: "Error for add Astronauts"});
    }
});



module.exports = router