const dotenv = require("dotenv").config()
const express = require("express");
const cors = require('cors');
const app = express();
const errorHandler = require("./middleWare/errorMiddleWare");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./routes/userRoute")
const teamRoutes = require("./routes/teamRoute")
const serviceRoutes = require("./routes/serviceRoute")
const sendContact = require("./routes/contactRoute")
const blogRoute = require("./routes/blogRoute")
const aboutRoute = require("./routes/aboutRoute")
const inquiryRoute = require("./routes/inquiryRoute")
const testimonialRoute = require("./routes/testimonialRoute")

//middlewares
app.use(express.json())
app.use(cookieParser())


//this parse urlencoded data from coming req and make it available to req.body
app.use(express.urlencoded({
    extended:false
}))

//express.json parse the incoming req data and assign the parsed data to the req.body
app.use(express.json())

//cors middleware
//cors allows cross origin communication between frontend and backend, facilitating data exchange, API access
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials:true
    }
    ));
    const PORT = process.env.PORT || 5000
    
    //connect to database
    mongoose.connect(process.env.DATABASE_LOCAL).then(() => { 
        app.listen(PORT, () => { 
            console.log(`server is runnning on port ${PORT}`);
        })
    })
    .catch((error) => { 
        console.log(error)
    })
    
    //error middleware
    app.use("/api",userRoutes)
    app.use("/api/team",teamRoutes)
    app.use("/api/service", serviceRoutes)
    app.use("/api/blog", blogRoute)
app.use("/api/contact", sendContact)
app.use("/api/about", aboutRoute)
app.use("/api/inquiry", inquiryRoute)
app.use("/api/testimonial", testimonialRoute)
app.get("/",(req, res)=> {
    res.send("home Page")
})
    app.use(errorHandler)