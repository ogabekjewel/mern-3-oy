const users = require("../Model/UserModel")

module.exports = async function (bot, message, user) {
    try {
        const userId = message.from.id
        const messageId = message.message.message_id
        const data = message.data

        await users.findOneAndUpdate({
            user_id: userId,
        }, {
            lang: data,
        })

        


    } catch(e) {
        console.log(e)
    }
}