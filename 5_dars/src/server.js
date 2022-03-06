const TelegramBot = require("node-telegram-bot-api")
const { TOKEN } = require("../config")
const LangController = require("./Controller/LangController")
const MessageController = require("./Controller/MessageController")
const SignUp = require("./Controller/SignUp")
const mongo = require("./Model/mongo")
const users = require("./Model/UserModel")

const bot = new TelegramBot(TOKEN, {
    polling: true,
})

mongo() 

bot.on("message", async (message) => {
    let userId = message.from.id

    let user = await users.findOne({
        user_id: userId,
    })
    console.log(user)
    if(!user || (Number(user.step) && Number(user.step < 5))) {
        await SignUp(message, bot, user)
    } else {
        await MessageController(bot, message, user)
    }
})

bot.on("callback_query", async message => {
    const userId = message.from.id
    const data = message.data

    let user = await users.findOne({
        user_id: userId,
    })

    if(data == "lang") {
        await LangController(bot, message, user)
    } else {
        if(user.step == "lang") {
            
        }
    }

})
