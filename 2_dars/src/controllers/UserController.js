const { SignUpValidation, LoginValidation } = require("../modules/validations")
const { v4 } = require("uuid")
const users = require("../models/userModel")
const { generateToken } = require("../modules/jwt")
const { generateHash, compareHash } = require("../modules/bcrypt")


module.exports = class UserController {
    static LoginGET(req, res) {
        res.render("login")
    }
    static SignUpGet(req, res) {
        res.render("signup")
    }

    static async SignUpPost(req, res) {
        try {
            const { fullname, username, email, password } = await SignUpValidation(req.body)

            let hash = await generateHash(password)
            // console.log( fullname, username, email, password )
            
            let user  = await users.create({
                id: v4(),
                fullname,
                username,
                email,
                password: hash,  
            })
            // user dan token yasayabmiz, faqat password kerak emas shuning uchun undifined yozamiz
            let token = generateToken({
                ...user,
                password: undefined,
            })

            res.cookie("token", token).redirect("/")
        } catch(e) {
            res.render("signup", {
                error: "Barcha maydonlar to'g'ri to'ldirilishi kerak"
            })
        } 
    }

    static async LoginPost(req, res) {
        try {
            const { email, password } = await LoginValidation(req.body)
            
            let user = await users.findOne({
                email,
            })

            if(!user) {
                throw new Error("User is not registered")
            }

            let passwordTrue = await compareHash(password, user.password)

            if(!passwordTrue) {
                throw new Error("Incorrect password")
            }

            let token = generateToken({
                ...user,
                password: undefined,
            })
            
            res.cookie("token", token).redirect("/")
        } catch(e) {
            console.log(e)
            res.render("login", {
                error: e + "",
            })
        }
    }
}