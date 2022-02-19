const users = require("../models/userModel")
const Path = require("path")
const { checkToken } = require("../modules/jwt")

module.exports = class ProfileController {
    static async ProfileGet(req, res) {
        const { username } = req.params
        
        let user = await users.findOne({
            username: username,
        })

        if(!user) {
            res.redirect("/")
            return
        }

        res.render("profile", {
            user,
        })

    }
    static async AvatarPatch(req, res) {
        
        const { photo } = req.files
        await photo.mv(Path.join(__dirname, "..", "public", photo.md5 + '.'+ photo.mimetype.split("/")[1]))
        console.log(true)
        let token = req.cookies.token

        token = checkToken(token)

        if(!token) {
           res.redirect("/users/login")
           return
        }

        req.user = token


        let user = await users.findOneAndUpdate(
            { id: req.user.id },
            {
                avatar: `/public/${ photo.md5 + '.'+ photo.mimetype.split("/")[1] }`
            },
        )

        res.status(200).json({
            ok: true,
            src: `/public/${ photo.md5 + '.'+ photo.mimetype.split("/")[1] }`,
        })
    }
}