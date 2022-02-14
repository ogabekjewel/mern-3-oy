const TokenPost = require("../controllers/TokenPost")

const router = require("express").Router()

router.post("/", TokenPost)

module.exports = {
    path: "/token",
    router,
}