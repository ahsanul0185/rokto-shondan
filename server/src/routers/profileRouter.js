const { viewProfile, updateProfile } = require('../controllers/profileController');
const { isLoggedIn } = require('../middlewares/auth');

const profileRouter = require('express').Router();


profileRouter.get("/", isLoggedIn, viewProfile)
profileRouter.put("/update/:id", isLoggedIn, updateProfile)


module.exports = profileRouter;