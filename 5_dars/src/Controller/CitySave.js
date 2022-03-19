const users = require("../Model/UserModel")
const MenuController = require("./MenuController")
const { CityText } = require("./Texts")

module.exports = async function(bot, message, user) {
    try {
        const data = message.data
        const userId = message.from.id
        const messageId = message.message.message_id

        await users.findOneAndUpdate({
            user_id: userId,
        }, {
            step: 5,
            city: data,
        })

        let msg = CityText(user.lang)
        await bot.sendMessage(userId, msg) 
        await bot.deleteMessage(userId, messageId)
        await MenuController(bot, message, user)
        
    } catch(e) {
        console.log(e)
    }
}