const users = require("../Model/UserModel")
const { reqLocation } = require("./Texts")

module.exports = async function (bot, message, user) {
    const userId = message.from.id
    const text = message.text

    let msg  = reqLocation(user.lang) 

    await users.findOneAndUpdate({
        user_id: userId,
    }, {
        step: "startOrder",
    })

    await bot.sendMessage(userId, msg.text, {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [
                    {
                        text: msg.btns.location,
                        request_location: true,
                    }
                ],
                [
                    {
                        text: msg.btns.back,
                    }
                ]
            ]
        }
    })
}