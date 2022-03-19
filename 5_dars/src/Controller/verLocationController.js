const users = require("../Model/UserModel")
const startOrderController = require("./startOrderController")
const startOrderMenuController = require("./startOrderMenuController")

module.exports = async function (bot, message, user) {
    let userId = message.from.id 
    let text = message.text
    if(text == "✅ yes") {
        await users.findOneAndUpdate({
            user_id: userId,
        }, {
            step: 6,
        })

        await startOrderMenuController(bot, message, user)
    } else if(text == "❎ no") {
        await users.findOneAndUpdate({
            user_id: userId,
        }, {
            step: "startOrder",
        })

        await startOrderController(bot, message, user)
    }
}