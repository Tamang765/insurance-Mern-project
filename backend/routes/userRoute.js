const express = require("express")
const router = express.Router()
const { loginUser, registerUser, loginStatus,logoutUser } = require("../controllers/userController")




router.post("/login" , loginUser)
router.post("/register", registerUser)
router.get("/loggedin", loginStatus)
router.get("/logout", logoutUser)

module.exports =router