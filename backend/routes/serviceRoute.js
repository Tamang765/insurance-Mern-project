const express = require("express")
const router = express.Router();
const { createService, getAllServices, getService, updateService, deleteService, getServiceById } = require("../controllers/serviceController")
const protect = require("../middleWare/authMiddleWare")
const { upload } = require("../utils/fileUpload")

router.post("/", protect, upload.single("image"), createService);
router.get("/", getAllServices);
router.get("/:slug", getService);
router.get("/byid/:id", getServiceById)
router.patch("/:id", protect, upload.single("image"), updateService)
router.delete("/:id",protect, deleteService)

module.exports = router;
