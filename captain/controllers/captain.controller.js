const captainModel = require("../models/captain.model");
const blacklisttokenModel = require("../models/blacklisttoken.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv");
dotenv.config()

module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const captain = await captainModel.findOne({ email })

        if (captain) {
            return res.status(400).json({
                message: "Captain Already exist"
            })
        }

        const hash = await bcrypt.hash(password, 10);
        const newCaptain = new captainModel({ name, email, password: hash });
        await newCaptain.save();

        const token = jwt.sign({ id: newCaptain._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie('token', token)
        delete newCaptain._doc.password;
        res.send({
            token,
            newCaptain
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const captain = await captainModel
            .findOne({ email })
            .select('+password');
        if (!captain) {
            return res.status(400).json({
                message: "Invalid email pr password"
            })
        }
        const isMatch = await bcrypt.compare(password, captain.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email pr password"
            })
        }
        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET)
        delete captain._doc.password;
        res.cookie('token', token);
        res.send({
            token,
            captain
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.logout = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (token) {
            await blacklisttokenModel.create({ token });
        }
        res.clearCookie('token')
        res.send({
            message: "Captain logged out Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.profile = async (req, res) => {
    try {
        res.send(req.captain)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports.toggleavailability = async (req, res) => {
    // TODO make this routes for captain availability video till watch: 1:14:33
}