const users = require("../Model/UserModel")
const { CommentStart } = require("./Texts")

module.exports = async function (bot, message, user) {
    let userId = message.from.id
    let text = message.text
    let messageId = message.message_id

    await users.findOneAndUpdate({
        user_id: userId,
    },{
        step: "comment",
    })

    let msg = CommentStart(user.lang)

    await bot.sendMessage(userId, msg.text, {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [
                    {
                        text: msg.btn,
                    },
                ],
            ]
        }
    })
}