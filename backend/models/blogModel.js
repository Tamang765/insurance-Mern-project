const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:"User"
        },
        slug: {
            type: String,
            unique: true,
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
const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog