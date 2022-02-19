const {  AvatarPatch, ProfileGet } = require("../controllers/profileController")
const AuthMiddleware = require("../middlewares/AuthMiddleware")
const FileUpload = require("express-fileupload")
const router = require("express").Router()

router.get("/avatar", FileUpload(), AvatarPatch)
router.get("/:username", AuthMiddleware, ProfileGet)


module.exports = {
    path: "/",
    router, 
}