const Fs = require("fs/promises")
const Path = require("path")
const { nextTick } = require("process")

module.exports = async (req, res) => {
    let { token } = req.query
    if(!token) {
        res.status(403).json({
            ok: false,
            message: "Acces token Not found"
        })
        return
    }
    
    let dbPath = Path.join(__dirname, "..", "modules", "db.json")
    let db = await Fs.readFile(dbPath, "utf8")
    db = await JSON.parse(db)
    user = db.users.find(user => user.token === token)
    if(!user) {
        res.status(403).json({
            ok: false,
            message: "Access Token is invalid"
        })
        return
    }

    next()
}