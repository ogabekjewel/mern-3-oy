const SearchGet = require("../controllers/SearchGet")
const Authmiddleware = require("../Middlewares/Authmiddleware")

const router = require("express").Router()

router.get("/", Authmiddleware,SearchGet)

module.exports = {
    path:"/search",
    router,
}