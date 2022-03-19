const sms = require("./MessageSend")

module.exports = async function(bot, message, user) {
    try {
        const data = message.data
        const userId = message.from.id
        const  messageId = message.message.message_id
        let text = message.text

        let code = (""+ Math.random()).substring(2, 7)
        if(!Number(text) || !(Number(text) >= 9980000000) || !(Number(text) < 998999999999)) {
            let msg = reqPhone(user.lang)
            await bot.sendMessage(userId, msg)
            return
        }

        await sms(Number(text), `Registratsiya kodi ${code}`)

        await bot.sendMessage(userId, "Telefon raqamizngizga tasdiqlash kodi yuborildi", {
            reply_markup: keyboard, 
        })

    } catch(e) {
        console.log(e + "")
    }
}