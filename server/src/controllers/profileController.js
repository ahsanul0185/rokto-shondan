const createHttpError = require("http-errors");
const donorModel = require("../models/donorModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const viewProfile = async (req, res, next) => {
    try {
        
        const token = req.cookies.accessToken;

        if (!token) {
            throw createHttpError(401, "Unauthorized")
            
        }

        const decoded = jwt.verify(token, process.env.JWT_LOGIN_KEY)

        res.status(200).json({success: true, message : "Donor profile returned", donor : decoded.donor})

    } catch (error) {
        next(error)
    }
}

const updateProfile = async (req, res, next) => {
    try {
        
        const donorId = req.params.id;
        const updates = req.body;

        if (updates.phone) {
            throw createHttpError(400, "You can't change phone number.")
        }
        if (updates.password) {
            throw createHttpError(400, "You can't change password from here.")
        }

        const updatedDonor = await donorModel.findByIdAndUpdate(donorId, updates, { new: true, runValidators: true });

        if (!updatedDonor) {
            throw createHttpError(404, "Donor not found for make update.")
        }

        res.status(200).json({success: true, message : "Donor information updated successfully.", updatedDonor })

    } catch (error) {
        next(error)
    }
}

module.exports = {viewProfile, updateProfile}