const validator = require('validator');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const donorModel = require('../models/donorModel');
const createJSONWebToken = require('../utils/createJSONWebToken');
const { setAccessTokenCookie } = require('../utils/cookie');

const handleLogin = async (req, res, next) => {
    try {
        const { phone, password } = req.body;

        if (!phone || validator.isEmpty(phone) || !password || validator.isEmpty(password)) {
            throw createError(400, "Please enter phone number and passoword.")
        }

        const phoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
        if (!phoneRegex.test(phone)) {
            throw createError(400, "Please provide a valid phone number.")
        }

        const donor = await donorModel.findOne({ phone : phone });

        if (!donor) {
            throw createError(404, "User not found with the phone number.")
        }

        const isPasswordMatched = await bcrypt.compare(password, donor.password);

        if (!isPasswordMatched) {
            throw createError(401, "Incorrect password. Please try again.")
        }

        const accessToken = createJSONWebToken({ donor }, process.env.JWT_LOGIN_KEY, "7d");
        setAccessTokenCookie(res, accessToken);    

        res.status(200).json({success : true, message : "Logged in successfully.", accessToken})

    } catch (error) {
        next(error)
    }
}

const handleLogout = async (req, res, next) => {
    try {
        
        res.clearCookie('accessToken')

        res.status(200).json({success : true, message : "Logged out in successfully."})

    } catch (error) {
        next(error)
    }
}


module.exports = {handleLogin, handleLogout}