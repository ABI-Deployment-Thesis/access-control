const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    deleted: {
        type: Boolean,
        trim: true,
        required: true,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false
})

module.exports = model('user', UserSchema)