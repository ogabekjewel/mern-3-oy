const users = require("../Model/UserModel")

module.exports = async function (bot, message, user) {
    
    try {
        let userId  = message.from.id
        let messageId = message.message.message_id

        let keyboard = {
            inline_keyboard: [
                [
                    {
                        text: "🇺🇿 O'zbekcha",
                        callback_data: "uz",
                    },
                    {
                        text: "🇷🇺 Pусский",
                        callback_data: "ru",
                    },
                    {
                        text: "🇬🇧 English",
                        callback_data: "eng",
                    }
                ]
            ]
        }

        await users.findOneAndUpdate({
            user_id:userId,
        }, {
            step: "lang",
        })

        await bot.editMessageReplyMarkup(keyboard, {
            chat_id: userId,
            message_id: messageId,
        })

    } catch(e) {
        console.log(e + "")
    }
}