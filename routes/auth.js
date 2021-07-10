import express from 'express';
const router = express.Router();
import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import requireLogin from "../middleware/requiredLogin.js"


router.get("/protected", requireLogin, (req, res) => {
    res.send("Hello user to protected routes")
})


const JWT_SECRET = "ayush_Token";


router.post("/signup", (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!email || !name || !password) {
        return res.status(401).json({ error: "Please fill all fields completely" })
    }

    User.findOne({ email: email })
        .then((saveduser) => {
            if (saveduser) {
                return res.status(422).json({ error: "user already exists" })
            }

            bcrypt.hash(password, 10)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password: hashedpassword,
                        name,
                        pic
                    })

                    user.save()
                        .then(user => {
                            res.json({ message: "saved sucessully" })
                        })
                        .catch(err => {
                            res.json({ message: err.message })
                        })
                })


        })
        .catch(err => {
            res.json({ message: err.message })
        })
})


router.post("/signin", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ message: "Please enter both email and password" })
    }

    User.findOne({ email })
        .then(savedUser => {
            if (!savedUser) {
                return res.json({ message: "This user does not exist" })
            }

            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // return res.json({ message: "Login sucessful" })

                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email, followers, following, pic } = savedUser;
                        res.json({ message: "Login succesful", token, user: { _id, name, email, followers, following, pic } })
                    } else {
                        return res.json({ message: "Invalid email or password" })
                    }
                })
        })
        .catch(err => {
            return res.json({ message: err })
        })

})

export default router;