const { body, param, validationResult } = require('express-validator')

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

const getUserById = [
    param('id').escape(),
    validate
]

const getUserByEmail = [
    param('email').isEmail().normalizeEmail().escape(),
    validate
]

const saveUser = [
    body('email').isEmail().normalizeEmail().escape(),
    body('password').isString().escape().isLength({ min: 2, max: 20 }),
    body('name').isString().escape().isLength({ min: 2, max: 50 }),
    validate
]

const deleteUser = [
    body('id').escape(),
    validate
]

module.exports = {
    getUserById,
    getUserByEmail,
    saveUser,
    deleteUser
}