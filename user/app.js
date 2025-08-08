const express = require("express")
const dotenv = require("dotenv")
const app = express();
const userRoutes = require("./routes/user.routes")
const cookieParser = require('cookie-parser')
const { connect } = require("./db/db")
const rabbitMq = require("./service/rabbit")

connect();


rabbitMq.connect();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

dotenv.config()

app.use('/', userRoutes)

module.exports = app