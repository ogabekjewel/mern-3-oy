const { ProfileGET, AvatarPATCH } = require("../controllers/ProfileController")
const ExpressFileUpload = require("express-fileupload")
const router = require("express").Router()
const AuthMiddleware = require("./../middlewares/AuthMiddleware")

router.get("/404", (req, res) => {
    res.render("404")
})
router.patch("/avatar",ExpressFileUpload(), AvatarPATCH)
router.get("/:username", AuthMiddleware,  ProfileGET)


module.exports = {
    path: "/", 
    router,
} 