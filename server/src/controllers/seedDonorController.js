const { dummyDonors } = require("../dummyData");
const donorModel = require("../models/donorModel");


const seedDonors = async (req, res, next) => {
    try {
        // deleting all existing users
        await donorModel.deleteMany({});

        //inserting new users
        const donors = await donorModel.insertMany(dummyDonors);

        return res.status(201).json({success : true, message : "Donor seeded successfully", donors});
    } catch (error) {
        console.log(error)
    }
}

module.exports = seedDonors;