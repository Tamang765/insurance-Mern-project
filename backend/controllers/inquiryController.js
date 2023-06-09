const asyncHandler = require("express-async-handler")
const Inquiry = require("../models/inquiryModel")


const createInquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, message,subject } = req.body
  if (!name || !email || !phone || !message || !subject) {
    res.status(400)
    throw new Error("Please fill in all fields")
  }
  const inquiry = await Inquiry.create({
    name,
    email,
    phone,
    subject,
      message
  })
  console.log(inquiry)
  res.status(201).json({
    success: true,
    data: inquiry,
  })
})
const getAllInquiry = asyncHandler(async (req, res) => {
  const contacts = await Inquiry.find().sort("-createdAt")
  res.status(200).json(contacts)
})

const deleteInquiry = asyncHandler(async (req, res) => { 
  const inquiry = await Inquiry.findById(req.params.id)
  if (!inquiry) { 
      res.status(404)
      throw new Error("Inquiry not found")
  }
      await Inquiry.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"Inquiry deleted."})
  
})

module.exports = {
  createInquiry,
  getAllInquiry,
  deleteInquiry
}
