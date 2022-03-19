const categories = require("../../Model/CategoriesModel")

module.exports = async function (bot, message, admin, category_id) {
   try {
        const userId = message.from.id
        let categoryList = []
        if(category_id) {
            categoryList = await categories({
                category_id,
            })
        } else {
            categoryList = await categories.find()
        }

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

        for(let category of categoryList) {
            keyboard.keyboard.push([
                {
                    text: category.name,
                }
            ])
        }

        keyboard.keyboard.push([
            {
                text: "⬅️ Ortga",
            }
        ])

        await bot.sendMessage(userId, "Produkt qo'shish uchun kategoriyani tanlang",{
            reply_markup: keyboard,
        })
   } catch(e) {
       console.log(e)
   }
}