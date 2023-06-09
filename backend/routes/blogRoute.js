const express= require("express")
const { createBlog,
    getAllBlogs,
    getBlogBySlug,
    getBlogById,
    deleteBlog,
    updateBlog } = require("../controllers/blogController")
const  protect  = require("../middleWare/authMiddleWare")
const { upload} = require("../utils/fileUpload")
const router = express.Router()
router.post("/", protect, upload.single("image"), createBlog)
router.get("/", getAllBlogs)
router.get("/byId/:id", getBlogById)
router.get("/:slug", getBlogBySlug)
router.patch("/:id", protect,upload.single("image"), updateBlog)
router.delete("/:id",protect, deleteBlog)
    
    module.exports = router