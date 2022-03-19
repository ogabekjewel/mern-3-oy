const admins = require("../../Model/AdminModel")
const products = require("../../Model/ProductModel")

module.exports = async function (bot, message, admin, product_id) {
    const userId = message.from.id
    let price = Number(message.text)
    if(price == NaN) {
        await bot.sendMessage(userId, "Narx son bo'yicha kiriting")
        return        
    }

    await admins.findOneAndUpdate({
        user_id: userId,
    }, {
        step: `addProduct#${product_id}#description`
    })

    await products.findOneAndUpdate({
        id: product_id,
    }, {
        price,
    })

    await bot.sendMessage(userId, `Tovar haqida ma'lumot kiriting`, {
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
}