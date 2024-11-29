const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
// require('dotenv').config();

const isLoggedIn = async (req, res, next) => {
    try {
        
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            throw createHttpError(401, 'Access token not found, please log in.')
            // console.log(req.cookies.accessToken, "here")
        }


        const decoded = jwt.verify(accessToken, process.env.JWT_LOGIN_KEY);
        if (!decoded) {
            throw createHttpError(401, 'Invalid access token, please log in.')
        }
        req.donor = decoded.donor;
        next()
    } catch (error) {
        return next(error)
    }
}

module.exports = { isLoggedIn };