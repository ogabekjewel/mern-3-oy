const users = require("../Model/UserModel")
const { exchangePhone } = require("./Texts")

module.exports = async function (bot, message, user) {
    try {
        const userId = message.from.id
        const data = message.data
        const messageId = message.message.message_id
    
        await users.findOneAndUpdate({
            user_id: userId,
        }, {
            step: "phone",
        })
        
        let keyboard = {

        }
        let msg = exchangePhone(user.lang)
        await bot.sendMessage(userId, msg.text, {
            reply_markup: {
                resize_keyboard: true,
                keyboard: [
                    [
                        {
                            text: msg.btn
                        }
                    ]
                ]
            }
        })
    } catch(e) {
        console.log(e)
    }

} 