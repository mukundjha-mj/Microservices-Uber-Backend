const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 3600
    }
},{
    timestamps: true
})

module.exports = mongoose.model('blacklistToken', blacklistTokenSchema)
