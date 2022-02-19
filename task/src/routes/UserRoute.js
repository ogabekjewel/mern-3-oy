const { SignUpGET, LoginGET, SignUpPOST, LoginPOST } = require("./../controllers/UserController")

const router = require("express").Router()

router.get("/signup", SignUpGET)
router.get("/login", LoginGET)

router.post("/signup", SignUpPOST)
router.post("/login", LoginPOST)



module.exports = {
    path: "/users",
    router,
}