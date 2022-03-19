const { startOrderMenu } = require("./Texts")

module.exports = async function(bot, message, user) {
    try {
        const userId = message.from.id
        const text = message.text

        let msg = startOrderMenu(user.lang)

        keyboard = {
            resize_keyboard: true,
            keyboard: [ 
                [
                    {
                        text: msg.keyboard.location,
                    },
                    {
                        text: msg.keyboard.menu,
                    },
                ],
                [
                    {
                        text: msg.keyboard.orders,
                    },
                    {
                        text: msg.keyboard.family,
                    },
                ],
                [
                    {
                        text: msg.keyboard.comment,
                    },
                    {
                        text: msg.keyboard.settings,
                    },
                ],
            ]
        }

        await bot.sendMessage(userId, msg.text, {
            reply_markup: keyboard,
        })
    } catch(e) {
        console.log(e + "")
    }
}