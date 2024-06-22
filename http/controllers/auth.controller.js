const User = require('../../models/user')
const bcrypt = require('../../utils/bcrypt')
const jwt = require('../../utils/jsonwebtoken')

async function signin(req, res, next) {
    try {
        const email = req.body.email
        const insertedPassword = req.body.password

        const user = await User.findOne({ email: email, deleted: false }, { _id: 1, password: 1 })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const { _id, password } = user

        const checkPassword = await bcrypt.compare(insertedPassword, password)
        if (checkPassword) {
            const token = await jwt.generateSessionToken(_id)
            res.status(200).json({ message: token })
        } else {
            res.status(401).json({ message: 'Invalid email or password' })
        }
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

module.exports = {
    signin: signin
}