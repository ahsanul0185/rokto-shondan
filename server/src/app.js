
const express = require("express");
const donorRouter = require("./routers/donorRouter");
const authRouter = require("./routers/authRouter");
const profileRouter = require("./routers/profileRouter");
const cookieParser = require('cookie-parser')
const cors = require('cors');
const seedRouter = require("./routers/seedRouter");

require("dotenv").config();

const app = express();

const originURL = process.env.FRONTEND_URL || "http://localhost:5173"

app.use(express.json());
app.use(cors({
    origin: originURL,
    credentials: true,              // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.urlencoded({extended : true}))

app.use("/api/donors", donorRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/seed-donors", seedRouter);


app.get("/", (req, res) => {
    res.json({message : "welcome to Rokto Sondhan server."})
})

// server error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        success : false, 
        message: err.message || "Internal Server Error.",
    })
})

module.exports = app;