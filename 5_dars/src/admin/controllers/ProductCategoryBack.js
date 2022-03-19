const admins = require("../../Model/AdminModel")
const categories = require("../../Model/CategoriesModel")
const HomeController = require("./HomeController")
const ProductAdd1 = require("./ProductAdd1")
const ProductCategory = require("./ProductCategory")
const ProductCategoryID = require("./ProductCategoryID")

module.exports = async function(bot, message, admin) {
    try {
        const userId = message.from.id
        let categoryId = admin.step.split("#")[2]

        let category = await categories({
            id: categoryId,
        })

        if(categoryId == "all") {
            await admins.findOneAndUpdate({
                user_id: userId,
            }, {
                step: "0",
            })

            await  HomeController(bot, message, admin)
            return
        }

        let parentCategory
    
        if(category.category_id) {
            parentCategory = await categories.findOne({
                id: category.category_id,
            })
        }
    
        await admins.findOneAndUpdate({
            id: message.from.id,
        }, {
            step: `products#categories#${parentCategory?.id || "all"}`,
        })
    
        admin.step = `products#categories#${parentCategory?.id || "all"}` 
        await ProductCategory(bot, message, admin)     

        if(parentCategory) {
            await ProductAdd1(bot, message, admin)
        } else {
            await ProductCategoryID(bot, message, admin, category.category_id)
        }
    } catch(e) {
        console.log(e)
    }
}