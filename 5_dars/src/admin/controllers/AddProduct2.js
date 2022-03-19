const admins = require("../../Model/AdminModel")
const products = require("../../Model/ProductModel")

module.exports = async function (bot, message, admin, product_id) {
    try {
        const userId = message.from.id

        await admins.findOneAndUpdate({
            user_id: userId,
        }, {
            step: `addProduct#${product_id}#price`
        })


        await products.findOneAndUpdate({
            id: product_id,
        }, {
            name: message.text,
        })

        await bot.sendMessage(userId, `<b>${message.text}</b>ning narxi qancha`, {
            parse_mode: "HTML",
            reply_markup: {
                resize_keyboard: true,   
                keyboard: [
                    [
                        {
                            text: "⬅️ Ortga",
                        }
                    ]   
                ]
            }
        })
    } catch(e) {
        console.log(e)
    }
}