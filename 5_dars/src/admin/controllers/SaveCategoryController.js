const admins = require("../../Model/AdminModel")
const categories = require("../../Model/CategoriesModel")
const CategoryController = require("./CategoryController")
const { v4 } = require("uuid")
module.exports = async function(bot, message, admin, category_id) {
    try {
        const text = message.text
        const userId = message.from.id
    
        await admins.findOneAndUpdate({
            user_id: userId,
        }, {
            step: `categories#${category_id ? category_id : "all"}`,
        })
    
       let category = await categories.create({
           id: v4(),
           name: text,
           category_id: category_id ? category_id : undefined,
       })

       await CategoryController(bot, message, admin, category_id == "undefined" ? undefined : category_id)
    } catch(e) {
        console.log(e)       
    }
}