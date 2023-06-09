const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const sendContact = asyncHandler(async (req, res) => {
    const { fullname, email, phoneNumber, subject, message } = req.body;

    if (!fullname || !email || !phoneNumber || !subject || !message) { 
        res.status(400)
        throw new Error("Fill all form")
    }
    const contact = await Contact.create({
        fullname,
        email,
        phoneNumber,
        subject,
        message
    })
    res.status(201).json({
        sucess: true,
        data:contact
    })
})
//get all contacts 
const getAllContacts = asyncHandler(async (req, res) => { 
    const contacts = await Contact.find().sort("-createdAt")
    res.status(200).json(contacts)
})
module.exports = {
    getAllContacts,
    sendContact
}