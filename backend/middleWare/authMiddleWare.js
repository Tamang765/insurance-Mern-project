const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
//express async handler helps in simplifying error handling process by catching error
const expressAsyncHandler = require("express-async-handler")
const protect = expressAsyncHandler(async (req, res, next) => { 
    try { 
        const token = req.cookies.token
        if (!token) {
            res.status(401)
            throw new Error("Not authorizeds, please Login")
        }
        //verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        //get user id from token
        // "-" this prefix excludes password field from the selected user
        const user = await User.findById(verified.id).select("-password")
        if (!user) { 
            res.status(401)
            throw new Error("User not found")
        }
        req.user = user
        next()
    }
    catch (error) {
        res.status(401)
        throw new Error("Not authorized , Please Login")
     }
})
module.exports=protect