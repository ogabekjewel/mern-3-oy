const { LoginGET, SignUpGet, LoginPost, SignUpPost } = require("../controllers/UserController")

const router = require("express").Router()

router.get("/login", LoginGET)
router.get("/signup", SignUpGet)

router.post("/login", LoginPost)
router.post("/signup", SignUpPost)

module.exports = {
    path: "/users",
    router,
}