const SearchGet = require("../controllers/SearchGet")

const router = require("express").Router()

router.get("/", SearchGet)

module.exports = {
    path:"/search",
    router,
}