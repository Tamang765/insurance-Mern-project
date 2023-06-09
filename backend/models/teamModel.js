const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:"User"
        },
        name: {
            type: String,
            require: [true, "Please provide Full Name"],
            trim:true
        },
        post: {
            type: String,
            require:[true, "please provide post"]
        },
        description: {
            type: String,
            require:[true, "please provide description"]
        },
        image: {
            type: Object,
            default: {}
        }
    }
    , {
        timestamps:true
    }
)

//naming convention should be  matching in controller and model
const team = mongoose.model("Team", teamSchema);
module.exports = team;