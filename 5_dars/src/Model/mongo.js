const mongoose = require("mongoose")
const { MONGO_URL } = require("../../config")

// import model ...
require("./UserModel")
require("./CommentModel")
require("./ProductModel")
require("./CategoriesModel")
require("./AdminModel")

module.exports = async function() {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("MONGO CONNECTION")
    } catch(e) {
        console.log("MONGO CONNECT FAILED " + e)
    }
}