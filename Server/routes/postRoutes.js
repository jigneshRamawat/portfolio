import express from "express";
import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Post from "../models/Post.js";

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "posts_uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file?.path || null;
    const publicId = req.file?.filename || null;

    const newPost = new Post({
      title,
      description,
      image: { url: imageUrl, public_id: publicId },
    });

    await newPost.save();
    res.status(201).json({ success: true, message: "Post created successfully!", newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (req.file) {
      if (post.image?.public_id) {
        try {
          await cloudinary.uploader.destroy(post.image.public_id);
        } catch (e) {}
      }

      post.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    post.title = req.body.title ?? post.title;
    post.description = req.body.description ?? post.description;

    const updatedPost = await post.save();
    res.json({ success: true, message: "Post updated successfully", updatedPost });
  } catch (err) {
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.image?.public_id) {
      try {
        await cloudinary.uploader.destroy(post.image.public_id);
      } catch (e) {}
    }

    await post.deleteOne();
    res.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
});

export default router;
