const { SettingsMsg } = require("./Texts")

module.exports = async function (bot, message, user) {
    try {
        let userId = message.from.id
        let text = message.text

        let Msg = SettingsMsg(user)

        
        keyboard = {
            inline_keyboard: [
                [
                    {
                        text: Msg.keyboard.lang,
                        callback_data: "lang",
                    },
                    {
                        text: Msg.keyboard.city,
                        callback_data: "city",
                    },
                    {
                        text: Msg.keyboard.phone,
                        callback_data: "phone",
                    },
                ],
            ] 
        }

        await bot.sendMessage(userId, Msg.text, {
            parse_mode: "HTML",
            reply_markup: keyboard,
        })
    } catch(e) {
        console.log(e)
    }
}  