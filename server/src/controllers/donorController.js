const donorModel = require("../models/donorModel");
const createError = require('http-errors');
const mongoose = require('mongoose');
const validator = require('validator');

const getDonors = async (req, res, next) => {
    try {

        const { donorType, bloodGroup, district, upazilla } = req.query;
        
        let query = {};

        if (donorType) query.donorType = donorType
        if (bloodGroup) query.bloodGroup = bloodGroup;
        if (district) query.district = district;
        if (upazilla) query.upazilla = upazilla;
    

        const donors = await donorModel.find(query).select("-password");

        if (!donors || donors.length === 0) {
            // throw createError(404, "Donors not found.") 
            res.status(200).json({success : false, message : "Donors not found"})
        }

        res.status(200).json({success : true, message : "Donors returned successfully.", donors})

    } catch (error) {
        next(error)
    }
}

const getDonorById = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: 'Invalid donor Id.' });
        }
        
        const donor = await donorModel.findById(id).select("-password");

        if (!donor) {
            res.status(200).json({success : false, message : "Donor not found"})
        }

        console.log(donor)
        res.status(200).json({success : true, message : "Donor returned successfully.", donor})

    } catch (error) {
        next(error)
    }
}


const registerDonor = async (req, res, next) => {
    try {
        const donorData = req.body;
        
        const donorExistWithNumber = await donorModel.exists({ phone: donorData.phone });

        if (donorExistWithNumber) {
            // return res.status(409).json({message : "The phone number already in use."})  
            throw createError(409, "The number already in use.")
        }

        if (!validator.isLength(donorData.fullName, {min : 3})) {
            throw createError(400, "Name must be at least 3 characters long.")
        }

        if (!validator.isEmail(donorData.email)) {
            throw createError(400, "Invalid email address.")
        }

        if (!validator.isStrongPassword(donorData.password)) {
            throw createError(400, "A strong password must contain at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character")
        }
        if (donorData.password !== donorData.confirmPassword) {
            throw createError(400, "Password didn't match.");
        }
        delete donorData.confirmPassword;

        const newDonor = new donorModel(donorData);

        const registeredDonor = await newDonor.save();

        res.status(201).json({ success: true, message: "donor registered successfully.", donor : registeredDonor })
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Extract the specific validation message
            const messages = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        console.log(err)
        next(err)
    }
}


module.exports = {getDonors, registerDonor, getDonorById} 