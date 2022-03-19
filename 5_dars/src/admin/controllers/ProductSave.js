const admins = require("../../Model/AdminModel")
const products = require("../../Model/ProductModel")
const AddProduct1 = require("./AddProduct1")
const ProductAdd1 = require("./ProductAdd1")
const ProductCategoryID = require("./ProductCategoryID")

module.exports = async function (bot, message, admin) {
    try {
        const userId = message.from.id

        const product_id = admin.step.split("#")[1]

        let product = await products.findOne({
            id: product_id,
        })

        await admins.findOneAndUpdate({
            user_id: userId,
        }, {
            step: `products#categories#${product.category_id || "all"}`,
        })

        await bot.sendMessage(userId, "Produkt saqlandi")

        if(!product.category_id) {
            await AddProduct1(bot, message, admin)
        } else {
            await ProductCategoryID(bot, message, admin, product.category_id)
        }
    } catch(e) {
        console.log(e)
    }
}