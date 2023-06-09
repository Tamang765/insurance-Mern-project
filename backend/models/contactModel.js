const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            require: [true, "please provide fullname"]
        },
        email: {
            type: String,
            require: [true, "please provide email"],
            trim: true
        },
        phoneNumber: {
            type: String,

        },
        subject: {
            type: String,
        },
        message: {
            type: String,
            require:[true, "please provide message"]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires:2592000000
        }
    }
    , {
        timestamp:true
    }
)

const contact = mongoose.model("Contact", contactSchema);
module.exports=contact

