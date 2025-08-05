const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    isAvailable: {
        type: Boolean,
        default: false
    }
})

const captainModel = mongoose.model('captain', captainSchema)

module.exports = captainModel