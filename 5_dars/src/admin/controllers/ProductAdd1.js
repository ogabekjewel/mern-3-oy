const { v4 } = require("uuid")
const admins = require("../../Model/AdminModel")
const products = require("../../Model/ProductModel")

module.exports = async function(bot, message, admin, category_id) {
    try {
        const userId = message.from.id
        let product = await products.create({
            id: v4(),
            category_id: category_id != "undefined" ? category_id : undefined,
        })
        await admins.findOneAndUpdate({
            user_id: userId,
        }, {
            step: `addProduct#${product.id}#name`
        })
        await bot.sendMessage(userId, "Tovar nomini kiriting", {
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