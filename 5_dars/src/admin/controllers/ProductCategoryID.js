const admins = require("../../Model/AdminModel")
const categories = require("../../Model/CategoriesModel")

module.exports = async function(bot, message, admin, category_id) {
    try {
        const userId = message.from.id

        let category = await categories.findOne({
            id: category_id,
        })

        if(category) {
            await admins.findOneAndUpdate({
                user_id: userId,
            }, {
                step: `products#categories#${category.id}`
            })

            let categoryList = await categories.find({
                category_id: category.id,
            })

            let keyboard = {
                resize_keyboard: true,
                keyboard: [
                    [
                        {
                            text: "➕ Qo'shish",
                        }
                    ]
                ]
            }

            for(let i = 0; i < categoryList.length; i += 2) {
                let newRow = []
                newRow.push({
                    text: categoryList[i].name,
                })
                if(categoryList[i + 1]) {
                    newRow.push({
                        text: categoryList[i + 1].name,
                    })
                }
                keyboard.keyboard.push(newRow)    
            }

            keyboard.keyboard.push([
                {
                    text: "⬅️ Ortga",
                }
            ])

            await bot.sendMessage(userId, category.name, {
                reply_markup: keyboard,
            })
        }
    } catch(e) {
        console.log(e)
    }
}