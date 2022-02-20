const users = require("../models/UsersModel")

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
        console.log(req.files)
        let { photo } = req.files 
        console.log(photo) 
 
    }
}