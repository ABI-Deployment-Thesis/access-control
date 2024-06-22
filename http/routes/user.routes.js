const router = require('express').Router()
const userController = require('../controllers/user.controller')
const { isAuthenticated } = require('../middleware')
const validator = require('../validator')

router.get('/user/:id', isAuthenticated, validator.getUserById, userController.getUserById)
router.get('/user-by-email/:email', isAuthenticated, validator.getUserByEmail, userController.getUserByEmail)
router.post('/user', validator.saveUser, userController.saveUser)
router.put('/delete/user', isAuthenticated, validator.deleteUser, userController.deleteUser)

module.exports = router