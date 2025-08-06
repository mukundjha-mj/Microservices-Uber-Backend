const express = require("express")
const captainController = require("../controllers/captain.controller")
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")


router.post('/register',captainController.register)
router.post('/login',captainController.login)
router.get('/logout', captainController.logout)
router.get('/profile',authMiddleware.captainAuth, captainController.profile)
router.patch('/toggle-availability',authMiddleware.captainAuth, captainController.toggleavailability)

module.exports= router  