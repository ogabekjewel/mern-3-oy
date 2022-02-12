const Express = require("express")
const CookieParser = require("cookie-parser")
const Path = require("path")
const Morgan = require("morgan")
const Helmet = require("helmet")
const Glob = require("glob")

const { PORT } = require("../config")

const app = Express()

// Glob ni fs ni o'rniga ishlatsak boladi 
// route larni dinamik o'qib middleware qilib beradi
Glob("**/*Route.js", (err , files) => {
    if(!err) {
        files.forEach((file) => {
            let RoutePath = Path.join(__dirname,'..', file)
            let Route = require(RoutePath)
            if(Route.path && Route.router) {
                app.use(Route.path, Route.router)
            }
        })
    }
})
// ejsni o'qish uchun
app.set("view engine", "ejs")
app.set("views", Path.join(__dirname, "views"))

app.use(Morgan("tiny"))
// Helmet xavfsizlikni ta'minlash uchun
app.use(Helmet())


app.listen(PORT, _ => console.log(`SERVER READY http://localhost/${PORT}`))

