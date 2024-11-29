const seedDonors = require('../controllers/seedDonorController');

const seedRouter = require('express').Router();


seedRouter.post("/", seedDonors)


module.exports = seedRouter;