const express = require("express")
const dotenv = require("dotenv")
dotenv.config();

const app = express();
const rideRoutes = require("./routes/ride.routes")
const cookieParser = require("cookie-parser")
const { connect } = require("./db/db")
const rebbitMq = require("./service/rabbit");


connect();



rebbitMq.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/", rideRoutes)

module.exports = app