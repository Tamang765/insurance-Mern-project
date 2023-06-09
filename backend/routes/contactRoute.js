const express = require("express");
const protect = require("../middleWare/authMiddleWare");
const router = express.Router();

const { getAllContacts, sendContact } = require("../controllers/contactController");

router.get("/", getAllContacts);
router.post("/create_contact",sendContact)

module.exports = router