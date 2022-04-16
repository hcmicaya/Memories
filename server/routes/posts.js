import express from "express";
import {
    getPost,
    getPosts,
    getPostsBySearch,
    createPosts,
    updatePost,
    deletePost,
    likePost,
    commentPost,
    deleteComment,
    getPostsByCreator,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/creator", getPostsByCreator);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);
router.patch("/:id/deleteComment", auth, deleteComment);

export default router;
