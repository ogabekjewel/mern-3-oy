const users = require("../Model/UserModel")
const MenuController = require("./MenuController")
const { verLocation } = require("./Texts")

module.exports = async function(bot, message, user) {
    try {
        const userId = message.from.id
        const text = message.text
        
        if(message.location) {
            await users.findOneAndUpdate({
                user_id: userId,
            }, {
                step: "verLocation",
                longitude: message.location.longitude,
                latitude: message.location.latitude,
            })

            let msg = verLocation(user.lang)
            
            await bot.sendMessage(userId, msg.text, {
                reply_markup: {
                    resize_keyboard: true,
                    keyboard: [
                        [
                            {
                                text: msg.btns.no,
                            }, 
                            {
                                text: msg.btns.yes
                            }
                        ]
                    ]
                }
            })

            // step=6 controller

        } else if(text == "⬅️ Ortga") {
            await users.findOneAndUpdate({
                user_id: userId,
            }, {
                step: 5,
            })

            await MenuController(bot, message, user)
        }
    } catch(e) {
        console.log(e)
    }
}