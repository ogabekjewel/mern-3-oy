const path = require("path")
const FS = require("fs/promises")
const JWT = require("jsonwebtoken")


module.exports = async (req, res) => {
    try {
        const { email, password } = req.body
        let dbPath = path.join(__dirname, "..", "modules", "db.json")

        if(!email && !password) {
            throw new Error("email and password is not found")
        }

        let db = await FS.readFile(dbPath, "utf8")
        db = await JSON.parse(db)
        let user = db.users.find((user) => user.email === email.toLowerCase())
            
        if(!user) {
            let newUser = {
                email: email.toLowerCase(),
                password: password,
                token: JWT.sign({ email }, "SECRET_WORD")
            }
            db.users.push(newUser)
            await FS.writeFile(dbPath, JSON.stringify(db))
        } else {
            if(user.password !== password){
                throw new Error("Password is incorrect")
            }
        }

        // db ni qayta o'qib olamiz chunki tepada user qo'shilgan bo'lishi mumkin
        db = await FS.readFile(dbPath, "utf8")
        db = await JSON.parse(db)
        user = db.users.find((user) => user.email === email.toLowerCase())
        token = user.token
        res.status(200).json({
            ok: true,
            token,
        })

        
    } catch(e) {
        res.status(400).json({
            ok: false,
            message: e + "",
        })
    }
}