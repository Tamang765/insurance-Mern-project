const mongoose= require("mongoose");

const testiSchema= mongoose.Schema({
    
    name: {
        type:String,
        required:true
    },
    post: {
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    image: {
        type: Object,
        default: {}
    }
})


const Testimonial= mongoose.model("Testimonial", testiSchema);
module.exports=Testimonial

