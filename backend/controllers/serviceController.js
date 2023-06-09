const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2
const { fileSizeFormatter } = require("../utils/fileUpload");
const Service = require("../models/serviceModel");
const slugify = require("slugify");



const createService = asyncHandler(async (req, res) => {
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
                folder: "insurance/service",
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
    //create service
    const service = await Service.create({
        user: userId,
        title,
        description,
        slug:slug,
        image:fileData
    })
    res.status(201).json({
        success: true,
        data:service
    })
})

//get all services
const getAllServices = asyncHandler(async (req, res) => { 
    const services = await Service.find().sort("-createdAt")
    res.status(200).json(services)
})

//slug service
const getService = asyncHandler(async (req, res) => {
    const service = await Service.findOne({ slug: req.params.slug })
    if (!service) { 
        res.status(404)
        throw new Error("Service Post Not found")
    }
    res.status(200).json(service)
})

//getservice by id
const getServiceById = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id);
    const service = await Service.findById(id)
    if (!service) { 
        res.status(404)
        throw new Error("Service Post Not found")
    }
    res.status(200).json(service)
})
//update service
const updateService = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    const { id } = req.params
    const service = await Service.findById(id)
    if (!service) {
        res.status(404)
        throw new Error("Service not found")
    }
    if (service.user.toString() !== req.user.id) {
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
    const updatedService = await Service.findByIdAndUpdate(
        {
            _id: id
        },
        {
            title,
            description,
            image:Object.keys(fileData).length ===0 ? service?.image :fileData
        },
        {
            new: true,
            runValidators:true,
        }
    )
    res.status(200).json(updatedService)
    }
)
//delete service
const deleteService = asyncHandler(async (req, res) => { 
    const service = await Service.findById(req.params.id)
    // const { id } = req.params
    if (!service) { 
        res.status(404)
        throw new Error("Service not found")
    }
    // if (service.user?.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error("user not authorized")
    // }
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Service deleted."})
    
})

module.exports = {
    createService,
    getService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
}