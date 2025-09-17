const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");

// Upload Document
router.post("/", documentController.uploadDocument);

// List User Documents
router.get("/user/:id", documentController.listUserDocuments);

// Soft Delete Document
router.delete("/:id", documentController.softDeleteDocument);

// Restore Document
router.patch("/:id/restore", documentController.restoreDocument);

module.exports = router;
