const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('../utils/bcrypt')

const con = async function () {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        logger.info('Connected to mongo DB')
    } catch (err) {
        logger.error(err)
    }
}

const init = async function () {
    try {
        const admin = await new User({
            _id: new mongoose.Types.ObjectId(),
            email: 'admin@email.com',
            password: await bcrypt.hashString('admin'),
            name: 'admin'
        })
        await admin.save()
    } catch (err) {
        if (err.code === 11000 && err.keyPattern.email)
            logger.debug('admin account already exists')
        else
            logger.error(err)
    }
}

module.exports = {
    con,
    init
}