const comments = require("../Model/CommentModel")
const users = require("../Model/UserModel")
const MenuController = require("./MenuController")
const { CommentFinish } = require("./Texts")

module.exports = async function async (bot, message, user) {
   try {
        let userId = message.from.id
        let text = message.text

        await comments.create({
            user_id: userId,
            text,
        })

        let commentMsg = CommentFinish(user.lang)

        await bot.sendMessage(userId, commentMsg)

        await users.findOneAndUpdate({
            user_id: userId,
        }, {
            step: 5,
        })

        await MenuController(bot, message, user)
   } catch(e) {
       console.log(e) 
   }
}