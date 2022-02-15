const mongoose = require("mongoose")
const { v4 } = require("uuid")

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    full_name: {
        type: String,
        min: 5,
        max: 50,
        required: true,
    },
    username: {
        type: String,
        min: 4,
        max: 50,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
})

const users = mongoose("users", userSchema)

module.exports = users

