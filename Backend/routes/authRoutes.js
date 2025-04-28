const authController = require('../auth/authController')
const express = require('express')
const router = express.Router()


router.post('/signup',authController.signup)
router.post('/login' ,authController.login)
router.post('/logout',authController.logout)

module.exports = router;