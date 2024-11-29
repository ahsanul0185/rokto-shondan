
const mongoose = require("mongoose");
require('dotenv').config()

const connectDB = async () => {

    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("db connected successfully")
    } catch (error) {
        console.error("Could not connect to db. ", error)
    }
}

module.exports = connectDB;