import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        rerquired: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://res.cloudinary.com/ayush5555/image/upload/v1624200976/Default_profile_ogqifw.png"
    },
    followers: [{ type: ObjectId }],
    following: [{ type: ObjectId }]

})

const res = mongoose.model("User", userSchema);
export default res;