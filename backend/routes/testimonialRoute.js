const express = require("express");
const {
  createTestimonial,
  getTestimonialById,
  deleteTestimonial,
  getAllTestimonial,
} = require("../controllers/testimonialController");
const { upload } = require("../utils/fileUpload");

const router = express.Router();

router.post("/",upload.single("image"), createTestimonial);
router.get("/",getAllTestimonial)
router.get("/:id", getTestimonialById);
router.delete("/:id", deleteTestimonial);

module.exports = router;
