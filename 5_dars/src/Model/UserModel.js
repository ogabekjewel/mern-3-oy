const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    phone_number: {
        type: String,
        unique: true,
    },
    city: {
        type: String,
    },
    code: {
        type: String,
    },
    lang: {
        type: String,
    },
    step: {
        type: String,
        required: true,
        default: 0,
    },
    longitude: {
        type: String,
    }, 
    latitude: {
        type: String,
    },
})

const users = mongoose.model("users", UserSchema)

module.exports = users