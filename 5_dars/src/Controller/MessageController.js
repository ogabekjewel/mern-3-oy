const { messageTypes } = require("node-telegram-bot-api/src/telegram")
const users = require("../Model/UserModel")
const checkLocation = require("./checkLocation")
const CommentController = require("./CommentController")
const CommentSave = require("./CommentSave")
const MenuController = require("./MenuController")
const SettingsController = require("./SettingsController")
const startOrderController = require("./startOrderController")
const verLocationController = require("./verLocationController")



module.exports = async function (bot, message, user) {
    let userId = message.from.id 
    let text = message.text
    
    if((user.step == 5 || user.step == 6) &&(text == "✍️ Fikr bildirish" || text == "✍️ Give feedback" || text == "✍️ Дать обратную связь")) {
        
        await CommentController(bot, message, user)

    } else if(user.step == "comment") {

        if(text == "⬅️ Ortga" || text == "⬅️ Назад" || text == "⬅️ Back") {
            await users.findOneAndUpdate({
                user_id: userId,
            }, {
                step: 5,
            })

            await MenuController(bot, message, user)
        } else {
            await CommentSave(bot, message, user)
        }
        
        

    } else if((user.step == "5" || user.step == "6") && (text == "⚙️ Sozlamalar" || text == "⚙️ Settings" || text == "⚙️ Настройки")) {
        await SettingsController(bot, message, user)
    } else if(user.step == "phone" && (text == "⬅️ Ortga" || text == "⬅️ Назад" || text == "⬅️ Back")) {
        await users.findOneAndUpdate({
            user_id: userId,
        }, {
            step: 5,
        })
        await MenuController(bot, message, user)
    } else if((user.step == "5" || user.step == "6") && (text == "🛒 Buyurtma qilish" || text == "🛒 To order" || text == "🛒 Заказать")) {
        await startOrderController(bot, message, user)
    } else if(user.step == "startOrder") {
        await checkLocation(bot, message, user)
    } else if(user.step == "verLocation") {
        await verLocationController(bot, message, user)
    } else if(user.step == "6" && text == "📍 Manzilni o'zgartirish") {
        await startOrderController(bot, message, user)
    }

}