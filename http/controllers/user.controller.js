const mongoose = require('mongoose')
const User = require('../../models/user')
const bcrypt = require('../../utils/bcrypt')

async function getUserById(req, res, next) {
    try {
        const id = req.params.id
        const user = await User.findOne({ _id: id, deleted: false })
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function getUserByEmail(req, res, next) {
    try {
        const email = req.params.email
        const user = await User.findOne({ email: email, deleted: false })
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function saveUser(req, res, next) {
    try {
        const id = new mongoose.Types.ObjectId()
        const email = req.body.email
        const password = await bcrypt.hashString(req.body.password)
        const name = req.body.name

        // Create a new user instance
        const newUser = await new User({
            _id: id,
            email: email,
            password: password,
            name: name
        })

        // Save the user to the database
        const savedUser = await newUser.save()
        res.status(201).json({ message: `User ${id} saved successfully` })
    } catch (err) {
        if (err.code === 11000 && err.keyPattern.email)
            res.status(400).json({ error: 'Duplicate email' })
        else
            res.status(400).json({ error: err })
    }
}

async function deleteUser(req, res, next) {
    try {
        const id = req.body.id
        const updatedUser = await User.updateOne({ _id: id }, { deleted: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

module.exports = {
    getUserById: getUserById,
    getUserByEmail: getUserByEmail,
    saveUser: saveUser,
    deleteUser: deleteUser
}