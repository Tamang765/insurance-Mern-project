const mongoose = require('mongoose');
const bcrypt =require("bcryptjs");
const { Schema, model } = mongoose;
const UserSchema = new Schema({
    fullname: { type: String, required: true, unique: true },
    email: { type: String, required: [true, "Please add email address"], unique: true, trim: true, match: [/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/, "please enter a valid email"], },
    password: { type: String, required: [true, "Please add Password"], minLength: [8, "password must be up to 8 character"] },
    
}, {
    timestamps:true,
})


//encypting password before saving to database
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")){ 
        return next()
    }
    
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
next()    
})

const User = mongoose.model('User', UserSchema);
module.exports = User;