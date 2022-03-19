const admins = require("../../Model/AdminModel")
const products = require("../../Model/ProductModel")

module.exports = async function(bot, message, admin, product_id) {
    const userId = message.from.id

    await admins.findOneAndUpdate({
        user_id: userId,
    }, {
        step: `addProduct#${product_id}#done`
    })

    await products.findOneAndUpdate({
        id: product_id,
    }, {
        pic: message.photo[message.photo.length - 1].file_id,
    })

    let product = await products.findOne({
        id: product_id,
    })

    await bot.sendPhoto(userId, product.pic, {
        caption: `<b>Nomi: </b>${product.name}\n<b>Narxi: </b>${product.price}\n<b>Ma'lumot: </b>${product.description}`,
        parse_mode: "HTML",
        reply_markup: {
            resize_keyboard: true, 
            keyboard: [
                [
                    {     
                        text: "Saqlash",    
                    }, 
                    {
                        text: "⬅️ Ortga",
                    },
                ],
            ]
        }
    })
}