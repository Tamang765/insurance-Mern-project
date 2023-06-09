const express = require("express")
const router = express.Router();
const { createTeam, getAllTeams, getTeamById, deleteTeam, updateTeam } = require("../controllers/teamController");
const protect = require('../middleWare/authMiddleWare');
const { upload } = require("../utils/fileUpload");


router.post("/",protect, upload.single("image"),createTeam)
router.get("/", getAllTeams)
// router.get("/:slug", getTeam)
router.get("/:id", getTeamById)
router.delete("/:id", deleteTeam);
router.patch("/:id",protect,upload.single("image"), updateTeam);
module.exports =router