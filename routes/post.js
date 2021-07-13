import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import requireLogin from "../middleware/requiredLogin.js";
import Post from "../models/post.js";
import {
    allpostController,
    getsubpostController,
    createpostController,
    mypostController,
    likeController,
    unlikeController,
    commentController,
    deleteController,
} from "../controllers/postController.js";

router.get("/allpost", requireLogin, allpostController);

router.get("/getsubpost", requireLogin, getsubpostController);

router.post("/createpost", requireLogin, createpostController);

router.get("/mypost", requireLogin, mypostController);

router.put("/like", requireLogin, likeController);

router.put("/unlike", requireLogin, unlikeController);

router.put("/comment", requireLogin, commentController);

router.delete("/delete/:postId", requireLogin, deleteController);

export default router;