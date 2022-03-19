const admins = require("../../Model/AdminModel")
const categories = require("../../Model/CategoriesModel")

module.exports = async function(bot, message, admin, category_id) {
    const userId = message.from.id
    let categoryList = await categories.find()

    if(category_id) {
        categoryList = await categories.find({
            category_id,
        })           
    } else {
        categoryList = await categories.find({
            category_id: {              
                $eq: null,
            } 
        })
       console.log(categoryList)
    }
                  
    let keyboard = {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: "➕ Qo'shish"
                }
            ]
        ]
    }

    for (let category of categoryList) {
        keyboard.keyboard.push([
                {
                    text: category.name,
                },
            ],
        ) 
    }

    // await admins.findOneAndUpdate({
    //     user_id: userId,
    // }, {
    //     step: `categories#${category_id || "all"}`,
    // })

    keyboard.keyboard.push([      
        {
            text: "⬅️ Ortga",
        }, 
    ])

    if(category_id) {
        keyboard.keyboard[keyboard.keyboard.length - 1].push({
            text: "🗑 o'chirish",
        })
    }

    if(categoryList.length) {
        await bot.sendMessage(userId, "Quyidagilardan birini tanlang", {
            reply_markup: keyboard,
        })
    } else {
        await bot.sendMessage(userId, "Ma'lumot mavjud emas", {
            reply_markup: keyboard,
        })
    }


}