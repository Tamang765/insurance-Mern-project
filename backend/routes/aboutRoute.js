const express= require("express")
const {  createAbout,
    getAbout,
    getAllabouts,
    getAboutById,
    updateAbout,
    deleteAbout} = require("../controllers/aboutController")
const  protect  = require("../middleWare/authMiddleWare")
const { upload} = require("../utils/fileUpload")
const router = express.Router()
router.post("/", protect, upload.single("image"), createAbout)
router.get("/", getAllabouts)
router.get("/:id", getAboutById)
router.get("/:slug", getAbout)
router.patch("/:id", protect,upload.single("image"), updateAbout)
router.delete("/:id",protect, deleteAbout)
    
    module.exports = router