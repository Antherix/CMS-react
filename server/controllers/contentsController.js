const Content = require("../models/Content");

// Create Content
const createContent = async (req, res) => {
    try {

        const content = await Content.create({
            ...req.body,
            author: req.user._id,
        });

        res.status(201).json({
            success: true,
            data: content,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};

// Get All Content
const getAllContent = async (req, res) => {
    try {
        const content = await Content.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data: content,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get All Published Content (public, no auth) - for the public blog frontend
const getPublicContent = async (req, res) => {
    try {
        const content = await Content.find({ status: "published", type: "post" })
            .sort({ createdAt: -1 })
            .populate("author", "name email");

        res.json({
            success: true,
            data: content,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get Single Published by Slug
const getPublicContentBySlug = async (req, res) => {
    try {
        const content = await Content.findOne({
            slug: req.params.slug,
            status: "published",
        }).populate("author", "name email");

        if (!content) {
            return res.status(404).json({
                success: false,
                message: "Content not found",
            });
        }

        res.json({
            success: true,
            data: content,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


// Get Single Content
const getContent = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);

        if (!content) {
            return res.status(404).json({
                success: false,
                message: "Content not found",
            });
        }

        res.json({
            success: true,
            data: content,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Update Content
const updateContent = async (req, res) => {
    try {
        const content = await Content.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            data: content,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Delete Content
const deleteContent = async (req, res) => {
    try {
        await Content.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Deleted successfully",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    createContent,
    getAllContent,
    getContent,
    updateContent,
    deleteContent,
    getPublicContent,
    getPublicContentBySlug,
};