const asyncHandler = require("express-async-handler");
const Testimonial = require("../models/testimonialModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;
const createTestimonial = asyncHandler(async (req, res) => {
  const { post,name, message } = req.body;
  if (!post || !name || !message) {
    res.status(400);
    throw new Error("all fields are required");
  }
  //handle image upload
  let fileData = {};
  if (req.file) {
    //save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "insurance",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("image could not be uploaded");
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }
  const testimonial =await Testimonial.create({
      name,
      post,
    message,
    image: fileData,
  });

  res.status(200).json({
    success: true,
    testimonial: testimonial,
  });
});

const getAllTestimonial = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find().sort("-createdAt")
    
  res.status(200).json(testimonials)
})

const getTestimonialById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const testi = await Testimonial.findById(id)
 

  if (!testi) {
    res.status(400);
    throw new Error("Testimonial Not found");
  }

  res.status(200).json(testi);
});

const deleteTestimonial= asyncHandler(async(req, res)=>{
  const testimonial= await Testimonial.findById(req.params.id);
  if(!testimonial){
    res.status(400)
    throw new Error("Testimonial not found")
  }

  await Testimonial.findByIdAndDelete(testimonial)
  res.status(200).json({message: "deleted successfully"})
})



module.exports = { createTestimonial, getTestimonialById,getAllTestimonial, deleteTestimonial };
