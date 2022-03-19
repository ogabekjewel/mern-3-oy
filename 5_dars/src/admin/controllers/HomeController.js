const admins = require("../../Model/AdminModel")

module.exports = async function (bot, message, admin) {
    try {
        const userId = message.from.id
        const {text} = message

        await admins.findOneAndUpdate({
            user_id: userId,
        }, {
            step: 0,
        })

        let keyboard = {
            resize_keyboard: true,
            keyboard:[
                [
                    {
                        text: "Kategoriyalar"
                    },
                    {
                        text: "Produkt qo'shish",
                    },
                ],
            ]
        }

        await bot.sendMessage(userId, "Quyidagilardan birini tanlang", {
            reply_markup: keyboard,
        })

    } catch(e) {
        console.log(e)
    }
}