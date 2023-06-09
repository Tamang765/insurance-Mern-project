const asyncHandler = require("express-async-handler");
const Team = require("../models/teamModel");
const cloudinary = require("cloudinary").v2;
const { fileSizeFormatter } = require("../utils/fileUpload");
const slugify = require("slugify");

const createTeam = asyncHandler(async (req, res) => {
  const { name, post, description } = req.body;
  const userId = req.user.id;
  const slug = slugify(req.body.name, {
    lower: true,
    remove: /[!:."'*@]/g,
    strict:true,
  })
  
  if (!name || !post || !description) {
    res.status(400);
    throw new Error("please fill in all fields");
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

  //create team
  const team = await Team.create({
    user: userId,
    name,
    post,
    slug:slug,
    description,
    image: fileData,
  });
  res.status(201).json({
    sucess: true,
    data: team,
  });
});

//get all teams
const getAllTeams = asyncHandler(async (req, res) => {
  const team = await Team.find().sort("-createdAt");
  res.status(200).json(team);
});

//get by slug for user
const getTeam = asyncHandler(async (req, res) => {
    const team = await Team.findOne({ slug: req.params.slug })
    if (!team) {
        res.status(404)
        throw new Error("team not found");
    }
    res.status(200).json(team)
})
//get by id 
const getTeamById = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    res.status(404);
    throw new Error("team not found");
  }

  res.status(200).json(team);
});

//update team
const updateTeam = asyncHandler(async (req, res) => {
  const { name, post, description } = req.body; 
  const { id } = req.params;
  const team = await Team.findById(id);
  if (!team) {
    res.status(404);
    throw new Error("team not found");
  }
  if (team.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "insurance",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("image couldn't be uploaded");
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }
  //update team
  const updatedTeam = await Team.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      name,
      post,
      image: Object.keys(fileData).length === 0 ? team?.image : fileData,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updateTeam);
});
//delete team
const deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);
  console.log(team);
  if (!team) {
    res.status(404);
    throw new Error("Team not found");
  }
  // if (team.user?.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  await Team.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "team deleted" });
});

module.exports = {
  createTeam,
  getAllTeams,
  // getTeam,
  getTeamById,
  deleteTeam,
  updateTeam,
};
