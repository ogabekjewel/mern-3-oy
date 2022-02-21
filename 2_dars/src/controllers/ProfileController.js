const users = require("../models/UsersModel")
const Path = require("path")
const { checkToken } = require("../modules/jwt")

module.exports = class ProfileController{
    static async ProfileGET(req, res) {
        let { username } = req.params

        let user = await users.findOne({
            username: username,
        })

        if(!user) { 
            res.redirect("/404")
            return   
        } 
        
        res.render("profile", {
            user,
        }) 
    }

    static async AvatarPATCH(req, res) {
        let { photo } = req.files
        

        await photo.mv(Path.join(__dirname, "..", "public", photo.md5 + '.' + photo.mimetype.split("/")[1]))

        let token = req.cookies.token
        token = checkToken(token)
        
        if(!token) {
            res.redirect("/users/login")
            return
        }
        
        
        req.user = token
        // console.log(token)
        
        // id bo'yicha topadi va update qiladi
        let user = await users.findOneAndUpdate(
            { id: req.user.id },
            {
                avatar: `/public/${
                    photo.md5 + '.' + photo.mimetype.split("/")[1]
                }`,
            }
        ) 
        
        res.status(200).json({
            ok: true,
            src: `/public/${photo.md5 + '.' + photo.mimetype.split("/")[1]}`
        })
    }
}