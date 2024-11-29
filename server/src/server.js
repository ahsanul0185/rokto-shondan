const app = require('./app');
const connectDB = require('./config/db');
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    connectDB();
})