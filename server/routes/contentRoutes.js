const express = require("express");

const router = express.Router();

const {
    createContent,
    getAllContent,
    getContent,
    updateContent,
    deleteContent,
} = require("../controllers/contentsController");

const protect = require("../middlewares/authMiddleware");

router.post("/", protect, createContent);

router.get("/", protect, getAllContent);

router.get("/:id", protect, getContent);

router.put("/:id", protect, updateContent);

router.delete("/:id", protect, deleteContent);

module.exports = router;