const express = require("express");

const router = express.Router();

const {
    createContent,
    getAllContent,
    getContent,
    updateContent,
    deleteContent,
    getPublicContent,
    getPublicContentBySlug,
} = require("../controllers/contentsController");

const protect = require("../middlewares/authMiddleware");

// Public routes (no auth) - must come before "/:id"
router.get("/public", getPublicContent);
router.get("/public/:slug", getPublicContentBySlug);

router.post("/", protect, createContent);

router.get("/", protect, getAllContent);

router.get("/:id", protect, getContent);

router.put("/:id", protect, updateContent);

router.delete("/:id", protect, deleteContent);

module.exports = router;