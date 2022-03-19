const admins = require("../../Model/AdminModel")
const categories = require("../../Model/CategoriesModel")
const AddController = require("./AddController")
const AddProduct1 = require("./AddProduct1")
const AddProduct2 = require("./AddProduct2")
const AddProduct3 = require("./AddProduct3")
const AddProduct4 = require("./AddProduct4")
const AddProduct5 = require("./AddProduct5")
const CategoryController = require("./CategoryController")
const DeleteProduct = require("./DeleteProduct")
const HomeController = require("./HomeController")
const ProductAdd1 = require("./ProductAdd1")
const ProductCategory = require("./ProductCategory")
const ProductCategoryBack = require("./ProductCategoryBack")
const ProductSave = require("./ProductSave")
const SaveCategoryController = require("./SaveCategoryController")

module.exports = async function(bot, message, admin) {
    try {
        const { text } = message
        const userId = message.from.id

        if(text == "/start" && admin.step == 0) {
            await HomeController(bot, message, admin)
        } else if(admin.step == "0" && text == "Kategoriyalar") {
            await admins.findOneAndUpdate({
                user_id: userId,
            }, {
                step: "categories#all",
            })
            await CategoryController(bot, message, admin)
        } else if(admin.step?.split("#")[0] == "categories") {
            if(text == "➕ Qo'shish") {
                let category_id = admin.step?.split("#")[1] == "all" ? undefined : admin.step?.split("#")[1]

                await AddController(bot, message, admin, category_id)
            } else if(text == "⬅️ Ortga") {
                let stepId = admin.step?.split("#")[1]

                if(stepId == "all") {
                    await admins.findOneAndUpdate({
                        user_id: userId,
                    }, {
                        step: "0",
                    })
                    await HomeController(bot, message, admin)
                    return
                }

                let category = await categories.findOne({
                    id: stepId,
                })

                await admins.findOneAndUpdate({
                    user_id: userId,
                }, {    
                    step: `categories#${category?.category_id || "all"}`
                })

                await CategoryController(bot, message, admin, category.category_id)

            } else if(text == "🗑 o'chirish") {
                let stepId = admin.step?.split("#")[1]
               let category = await categories.findOne({
                   id: stepId
               })

                await admins.findOneAndUpdate({
                    user_id: userId,
                }, {
                    step: `categories#${category.category_id || "all"}`
                })

                await categories.deleteOne({
                    id: stepId,
                })

                await categories.deleteMany({
                    category_id: stepId,
                })

                await CategoryController(bot, message, admin, category.category_id)

            } else {
                let category = await categories.findOne({
                    name: text,
                })
               
                if(category) {
                    let admin = await admins.findOneAndUpdate({
                        user_id: userId,
                    }, {
                        step: `categories#${category.id}`,
                    })    

                    await CategoryController(bot, message, admin, category.id)         
                }
            }    
            
        } else if(admin.step?.split("#")[0] == "addCategory") {
            let category_id = admin.step?.split("#")[1] == "all" ? undefined : admin.step?.split("#")[1]
            await SaveCategoryController(bot, message, admin, category_id)           
        } else if(admin.step == "0" && text == "Produkt qo'shish") {
            await admins.findOneAndUpdate({
                user_id: userId,
            }, {
                step: "products#categories#all",
            })

            await AddProduct1(bot, message, admin)
        } else if(admin.step.split("#")[0] == "products") {
            if(text == "➕ Qo'shish") {
                let step = admin.step.split("#")[2]
                step = step == "all" ? undefined : step
                await ProductAdd1(bot, message, admin, step)                
            } else if(text == "⬅️ Ortga") {
                await ProductCategoryBack(bot, message, admin)
            } else {
                await ProductCategory(bot, message, admin)
            }
        } else if(admin.step.split("#")[0] == "addProduct") {
            let product_id = admin.step.split("#")[1]
            let step = admin.step.split("#")[2]

            if(text == "⬅️ Ortga") {
                let product_id = step.split("#")[1]
                await DeleteProduct(bot, message, admin, product_id)
            } else if(step == "name") {
                await AddProduct2(bot, message, admin, product_id)
            } else if(step == "price") {
                await AddProduct3(bot, message, admin, product_id)
            } else if(step == "description") {
                await AddProduct4(bot, message, admin, product_id)
            } else if(step == "picture" && message.photo) {
                await AddProduct5(bot, message, admin, product_id)
            } else if(step == "done" && text == "Saqlash") {
                ProductSave(bot, message, admin)
            }
        }
 
    } catch(e) {
        console.log(e)
    }
}