const TelegramBot  = require("node-telegram-bot-api")
const { ADMIN_TOKEN, ADMIN_ID } = require("../../config")
const admins = require("../Model/AdminModel")
const MessageController = require("./controllers/MessageController")

module.exports = async function admin() {
    const bot = new TelegramBot(ADMIN_TOKEN, {
        polling: true,
    })

    bot.on("message", async (message) => {
        const userId = message.from.id
        const admin = await admins.findOne({
            user_id: `${userId}`,
        })

        console.log(admin.step)
        if(admin) {
            await MessageController(bot, message, admin)
        }
    })
}