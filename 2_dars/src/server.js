const Express = require("express")
const Fs = require("fs")
const Morgan = require("morgan")
const Path = require("path")
const CookieParser = require("cookie-parser")


const { PORT } = require("../config")
const mongo = require("./modules/mongoose")

const app = Express() 

app.listen(PORT, _ => console.log(`SERVER READY AT PORT ${PORT}`))

async function server() {
    app.use(Express.json())
    app.use(Express.urlencoded({ extended: true }))
    app.use(CookieParser())
    app.use("public", Express.static(Path.join(__dirname, "public")))
    
    app.set("view engine", "ejs")
    app.set("views", Path.join(__dirname, "views"))
    
    Fs.readdir(Path.join(__dirname, "routes"), (err, files) => {
        if(!err) {
            files.forEach(file => {
                let RoutePath = Path.join(__dirname, "routes", file)
                let Route = require(RoutePath)
                if(Route.path && Route.router) {
                    app.use(Route.path, Route.router)
                }
            })
        } 
    })
    await mongo()
}
server()
