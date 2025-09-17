const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Create User
router.post("/", userController.createUser);

module.exports = router;
