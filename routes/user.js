import express from 'express';
const router = express.Router();
import mongoose from "mongoose";
import requireLogin from "../middleware/requiredLogin.js"
import Post from "../models/post.js";
import User from "../models/user.js"
import { userController, followController, unfollowController, updatepicController } from "../controllers/userController.js"

router.get("/user/:id", requireLogin, userController)

router.put('/follow', requireLogin, followController)
router.put('/unfollow', requireLogin, unfollowController)

router.put('/updatepic', requireLogin, updatepicController)



export default router;