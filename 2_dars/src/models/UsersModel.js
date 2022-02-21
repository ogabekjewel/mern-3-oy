const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    full_name: {
        type: String,
        min: 3,
        max: 50,
        required: true,
    },
    username: {
        type: String,
        min: 3,
        max: 50,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    }
})

module.exports = mongoose.model("users", UserSchema)
