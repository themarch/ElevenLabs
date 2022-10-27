const { Router } = require('express');
const astronautsRouter = require ('./astronauts.js')
const statsRouter = require ('./stats')

const router = Router();

router.use('/astronauts', astronautsRouter)
router.use('/stats', statsRouter)

module.exports = router;