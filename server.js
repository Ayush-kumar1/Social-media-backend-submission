import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
const app = express();
const PORT = 5000;
import User from "./models/user.js"
import Post from "./models/post.js";
import authRoutes from "./routes/auth.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";


const dbURL = process.env.dbURL;
app.use(express.json())
app.use(cors());
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.use("/", authRoutes)

app.use("/", postRouter);

app.use("/", userRouter);

app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(PORT, () => {
    console.log("server is running on port", PORT)
})