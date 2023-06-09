const Blog = require("../models/blogModel");
const slugify = require("slugify");
//avoid repetitve error handling in route handler
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2
const { fileUpload, fileSizeFormatter } = require("../utils/fileUpload")

//create blo
const createBlog = asyncHandler(async (req, res) => { 
    const { title, description } = req.body
    console.log(req.body)
    const userId = req.user.id
    const slug = slugify(req.body.title, {
        lower: true,
        remove: /[*+~.()'":@']/g,
        strict:true
    })
    if (!title || !description) { 
        res.status(400)
        //thows error to error middleware and halt the execution of the function
        throw new Error("Please add title and description")
    }
    console.log(req.file)
    let fileData = {};
    if (req.file) { 
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Insurance/blog",
                resource_type:"image",
            })
        } catch (error) {
            res.status(500)
            throw new Error("failed to upload")
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        }
    }

    const blog = await Blog.create({
        user: userId,
        title,
        slug:slug,
        description,
        image:fileData
    })
    res.status(201).json({
        success: true,
        data:blog
    })
})

//get All blogs
const getAllBlogs = asyncHandler(async (req, res) => { 
    const blogs = await Blog.find().sort("-createdAt").populate("user");
    res.status(200).json(blogs)
})

//get blog by slug
const getBlogBySlug = asyncHandler(async (req, res) => { 
    const blog = await Blog.findOne({ slug: req.params.slug }).populate("user");
    if (!blog) { 
        res.status(404)
        throw new Error("blog not found")
    }
    res.status(200).json(blog)
})
//get by id
const getBlogById = asyncHandler(async (req, res) => { 
    const blog = await Blog.findById(req.params.id )
    if (!blog) { 
        res.status(404)
        throw new Error("blog not found")
    }
    // if (blog.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error("Blog not authorized")
    //   }
    res.status(200).json(blog)

})
//delete blog

const deleteBlog = asyncHandler(async (req, res) => { 
    const blog = await Blog.findByIdAndDelete(req.params.id)
    // if (blog.user.toString() !== req.user._id) { 
    //     res.status(401)
    //     throw new Error("not authorized")
    // }
    if (!blog) { 
        throw new Error("Blog not found")
    }
    res.status(200).json({ message: "blog deleted" })
})


//update blog

const updateBlog = asyncHandler(async (req, res) => { 
    const { title, description } = req.body
    const { id } = req.params
    const blog = await Blog.findById(id)
    // if (blog.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error("user not authorized")
    // }
    if (!blog) {
        res.status(404)
        throw new Error("Blog not found")
    }
    let fileData = {}
    if (req.file) { 
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Insurance/blog",
                resource_type:"image"
            })
        } catch (error) {
            res.status(500)
            throw new Error("image couldn't upload")
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize:fileSizeFormatter(req.file.size, 2)
        }

    }
    const updatedBlog = await Blog.findByIdAndUpdate({_id: id}, {
        title,
        description
        ,
        image:Object.keys(fileData).length ===0? blog?.image :fileData,
    }, {
        new: true,
        runValidators: true,
    }
    )
    res.status(200).json(updatedBlog)
})

module.exports = ({
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    getBlogById,
    deleteBlog,
    updateBlog

})