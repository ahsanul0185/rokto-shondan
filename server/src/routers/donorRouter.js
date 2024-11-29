const { getDonors, registerDonor, getDonorById } = require('../controllers/donorController');

const donorRouter = require('express').Router()


donorRouter.get("/", getDonors);
donorRouter.get("/:id", getDonorById);
donorRouter.post("/register", registerDonor);

module.exports = donorRouter;