const users = require("../Model/UserModel")
const CommentController = require("./CommentController")
const CommentSave = require("./CommentSave")
const MenuController = require("./MenuController")
const SettingsController = require("./SettingsController")


module.exports = async function (bot, message, user) {
    let userId = message.from.id 
    let text = message.text
    
    if((text == "✍️ Fikr bildirish" || text == "✍️ Give feedback" || text == "✍️ Дать обратную связь") && user.step == 5) {
        
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
        
        

    } else if(user.step == "5" && (text == "⚙️ Sozlamalar" || text == "⚙️ Settings" || text == "⚙️ Настройки")) {
        await SettingsController(bot, message, user)
    }

}