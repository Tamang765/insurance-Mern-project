const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:"User"
        },
        title: {
            type: String,
            require: [true, "Please add title"],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
          },
        description: {
            type: String,
            require:[true, "please description"]
        },
        image: {
            type: Object,
            default: {},
        }
    },
    {
        timestamps:true
    }
)
const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;