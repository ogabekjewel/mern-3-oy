const users = require("../models/UsersModel")
const { v4 } = require("uuid")
const { generateToken } = require("../modules/jwt")
const { generateHash, compareHash } = require("../modules/bcrypt")
const { SignUpValidation, LoginValidation } = require("../modules/validations")


module.exports = class UserController {
    static SignUpGET(req, res) {
        res.render("signup")
    }
    static LoginGET(req, res) {
        res.render("login")  
    }
    

    static async SignUpPOST(req, res) {
        const { full_name, username, email, password } = await SignUpValidation(req.body)
        
        let hash = await generateHash(password)
        
        let user = users.create({
            id: v4(),
            full_name,
            username,
            email,
            password: hash,
        })
        console.log(user)
        let token = generateToken({
            ...user,
            password: undefined,
        })

        res.cookie("token", token).redirect("/")
    }
    static async LoginPOST(req, res) {
        try {
            const { email, password } = await LoginValidation(req.body)
            
            let user = await users.findOne({
                email,
            })

            if(!user) {
                throw new Error("User not registered")
            }

            let isPasswordTrue = await compareHash(password, user.password)

            if(!isPasswordTrue) {
                throw new Error("password incorrect")
            }

            let token = generateToken({
                ...user,
                password: undefined,
            })

            res.cookie("token", token).redirect("/")
        } catch(e) {
            console.log(e)
            res.render("login", {
                error: e + '',
            })
        }
    }
    
}