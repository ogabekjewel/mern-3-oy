const admins = require("../../Model/AdminModel")
const products = require("../../Model/ProductModel")

module.exports = async function(bot, message, admin, product_id) {
    const userId = message.from.id
    const text = message.text

    await admins.findOneAndUpdate({
        user_id: userId
    }, {
        step: `addProduct#${product_id}#picture`
    })

    await products.findOneAndUpdate({
        id: product_id,
    }, {
        description: text
    })

    await bot.sendMessage(userId, "Product rasmini yuboring", {
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

}