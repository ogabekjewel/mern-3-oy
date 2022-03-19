const admins = require("../../Model/AdminModel")
const products = require("../../Model/ProductModel")
const HomeController = require("./HomeController")

module.exports = async function(bot, message, admin, product_id) {
    try {
        const userId = message.from.id

        await products.deleteOne({
            id: product_id,
        })
    
        await admins.findOneAndUpdate({
            id: userId,
        }, {
            step: "0",
        })
    
        await bot.sendMessage(userId, `Tovar qo'shish bekor qilindi`)
        await HomeController(bot, message, admin)        
    } catch(e) {
        console.log(e)
    }
}