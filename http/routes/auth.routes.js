const router = require('express').Router()
const authController = require('../controllers/auth.controller')

router.post('/signin', authController.signin)

module.exports = router