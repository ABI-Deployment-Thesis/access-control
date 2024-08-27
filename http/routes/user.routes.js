const router = require('express').Router()
const userController = require('../controllers/user.controller')
const { isAuthenticated } = require('../middleware')
const validator = require('../validator')

router.get('/users/:id', isAuthenticated, validator.getUserById, userController.getUserById)
router.get('/users-by-email/:email', isAuthenticated, validator.getUserByEmail, userController.getUserByEmail)
router.post('/users', validator.saveUser, userController.saveUser)
//router.put('/delete/users', isAuthenticated, validator.deleteUser, userController.deleteUser) // Requires implementation of user roles/permissions

module.exports = router