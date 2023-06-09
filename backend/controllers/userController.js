const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const generateToken = (id) => { 
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn:"1d"})
}
//register user
const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body
    console.log(req.body)
    if (!fullname || !email || !password) { 
        res.status(400)
        throw new Error("Fill all the required fields")
    }
    if (password.length < 8) { 
        res.status(400)
        throw new Error("Password must be upto 8 characters")
    }
    const userExists = await User.findOne({ email })
    if (userExists) { 
        res.status(400)
        throw new Error("User already Exits")
    }

    //after passing above criteria user create hunxa
const user = await User.create({
    fullname,
    email,
    password
})
    const token = generateToken(user._id)
    res.cookie("token", token, {
        path: "/",
        httpsOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure:true,
    })
    if (user) {
        const { _id, fullname, email } = user
        res.status(201)
    
        res.json({ message: "successfully registered" })
    }
    else { 
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) { 
        res.status(400)
        throw new Error("please add email and password")
    }
const user = await User.findOne({ email })
if (!user) { 
    res.status(400)
    throw new Error("User not found , Please signup")
    
}
const isValidPassword = await bcrypt.compare(password, user.password)
const token = generateToken(user._id)
res.cookie("token", token, {
    path: "/",
    httpsOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure:true,
})
if (user && isValidPassword) {
    const { _id, fullname, email } = user
    res.status(201).json({
        _id, fullname, email, token
    })
}
else {
    res.status(400)
    throw new Error("Invalid email or password")
 }
})
    
//login status
const loginStatus = asyncHandler(async(req, res) => {
    const token = req.cookies.token
    if(!token) { 
        return res.json(false)
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified) { 
        return res.json(true)
    }
    return res.json(false)
})

//logout user
const logoutUser = asyncHandler(async (req, res) => { 
    res.cookie("token", "", {
        path: "/",
        httpsOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure:true
    })
    return res.status(200).json({message:"Successfully Logged Out"})
})
module.exports = {
    registerUser,
    loginUser,
    loginStatus,
    logoutUser
}
