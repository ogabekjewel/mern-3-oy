const admins = require("../../Model/AdminModel")

module.exports = async function(bot, message, admin, category_id) {
    try {
        const text = message.text
        const userId = message.from.id

        await admins.findOneAndUpdate({
            user_id: userId,
        }, {
            step: `addCategory#${category_id ? category_id : "all"}`,
        })
        
        await bot.sendMessage(userId, `Category nomini kiriting`, {
            reply_markup: {
                resize_keyboard: true,
                keyboard: [
                    [
                        {
                            text: "⬅️ Ortga",
                        },
                    ],
                ],
            },
        })

    } catch(e) {
        console.log(e)
    }
}