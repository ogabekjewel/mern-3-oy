const users = require("../Model/UserModel")
const MenuController = require("./MenuController")
const { ChangeLang } = require("./Texts")

module.exports = async function (bot, message, user) {
    try {
        const userId = message.from.id
        const messageId = message.message.message_id
        const data = message.data

        await users.findOneAndUpdate({
            user_id: userId,
        }, {
            lang: data,
            step: 5,
        })
        user.lang = data
        let msg = ChangeLang(data)
        await bot.sendMessage(userId, msg)
        await bot.deleteMessage(userId, messageId) 
        await MenuController(bot, message, user)


    } catch(e) {
        console.log(e)
    }
}