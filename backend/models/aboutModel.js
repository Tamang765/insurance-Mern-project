const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:"User"
        },
        
        title: {
            type: String,
            require: [true, "please add title"]
        },
        description: {
            type: String,
            require: [true, "please add description"]
        },
        image:{
        type: Object,
            default: {}
        }
    },
    {
        timestamps:true
    }
)
const About = mongoose.model("About", aboutSchema)
module.exports = About