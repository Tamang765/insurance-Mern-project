const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2
const { fileSizeFormatter } = require("../utils/fileUpload");
const slugify = require("slugify");
const About = require("../models/aboutModel");



const createAbout = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    const userId = req.user.id
    console.log(req.body);
    // slug part
    const slug = slugify(req.body.title, {
        lower:true,
        remove: /[*+~.()'"!:@]/g,
        strict:true,
    })
    if (!title || !description) { 
        res.status(400)
        throw new Error("please fill in all fields")
    }
    //handle image upload
    let fileData = {}
    if (req.file) { 
        let uploadFile
        try {
            uploadFile = await cloudinary.uploader.upload(req.file.path), {
                folder: "insurance/about",
                resource_type:"image",
            }
        } catch (error) {
            res.status(500)
            throw new Error("Image could not be uploaded")
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadFile.secure_url,
            fileType: req.file.mimetype,
            fileSize:fileSizeFormatter(req.file.size, 2),
        }
    }
    //create about
    const about = await About.create({
        user: userId,
        title,
        description,
        slug:slug,
        image:fileData
    })
    res.status(201).json({
        success: true,
        data:about
    })
})

//get all abouts
const getAllabouts = asyncHandler(async (req, res) => { 
    const abouts = await About.find().sort("-createdAt")
    res.status(200).json(abouts)
})

//slug about
const getAbout = asyncHandler(async (req, res) => {
    const about = await About.findOne({ slug: req.params.slug })
    if (!about) { 
        res.status(404)
        throw new Error("About Post Not found")
    }
    res.status(200).json(about)
})

//getabout by id
const getAboutById = asyncHandler(async (req, res) => {
    const about = await About.findById(req.params.id)
    if (!about) { 
        res.status(404)
        throw new Error("About Post Not found")
    }
    res.status(200).json(about)
})
//update about
const updateAbout = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    const { id } = req.params
    const about = await About.findById(id)
    if (!about) {
        res.status(404)
        throw new Error("About not found")
    }
    if (about.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("user not authorized")
    }

    let fileData = {}
    if (req.file) {
        let uploadFile
        try {
            uploadFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "insurance",
                resource_type: "image",
            })
        } catch (error) {
            res.status(500)
            throw new Error("image could not be uploaded")
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        }
    }
    const updatedAbout = await About.findByIdAndUpdate(
        {
            _id: id
        },
        {
            title,
            description,
            image:Object.keys(fileData).length ===0 ? about?.image :fileData
        },
        {
            new: true,
            runValidators:true,
        }
    )
    res.status(200).json(updatedAbout)
    }
)
//delete about
const deleteAbout = asyncHandler(async (req, res) => { 
    const about = await About.findById(req.params.id)
    // const { id } = req.params
    if (!about) { 
        res.status(404)
        throw new Error("About not found")
    }
    // if (about.user?.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error("user not authorized")
    // }
        await About.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"About deleted."})
    
})

module.exports = {
    createAbout,
    getAbout,
    getAllabouts,
    getAboutById,
    updateAbout,
    deleteAbout
}