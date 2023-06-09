const express = require("express")
const router = express.Router()
const protect = require("../middleWare/authMiddleWare")
const { createInquiry, getAllInquiry, deleteInquiry } = require("../controllers/inquiryController")


router.post("/", createInquiry)
router.get("/", getAllInquiry)
router.delete("/:id", deleteInquiry)

module.exports = router
