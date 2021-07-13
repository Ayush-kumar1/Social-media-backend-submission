import requireLogin from "../middleware/requiredLogin.js";
import Post from "../models/post.js";
import res from "../models/user.js";

const allpostController = (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            res.json({ message: err });
        });
};

const getsubpostController = (req, res) => {
    Post.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            res.json({ message: err });
        });
};

const createpostController = (req, res) => {
    const { title, body, pic } = req.body;

    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please add all fields" });
    }

    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        photo: pic,
        postedBy: req.user,
    });
    post
        .save()
        .then((result) => {
            res.json({ post: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

const mypostController = (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("PostedBy", "_id name")
        .then((mypost) => {
            res.json({ mypost });
        })
        .catch((err) => {
            res.json({ message: err });
        });
};

const likeController = (req, res) => {
    Post.findByIdAndUpdate(
            req.body.postId, {
                $push: { likes: req.user._id },
            }, {
                new: true,
            }
        )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            } else {
                return res.json(result);
            }
        });
};

const unlikeController = (req, res) => {
    Post.findByIdAndUpdate(
            req.body.postId, {
                $pull: { likes: req.user._id },
            }, {
                new: true,
            }
        )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            } else {
                return res.json(result);
            }
        });
};

const commentController = (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id,
    };
    Post.findByIdAndUpdate(
            req.body.postId, {
                $push: { comments: comment },
            }, {
                new: true,
            }
        )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            } else {
                return res.json(result);
            }
        });
};

const deleteController = (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err });
            }

            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post
                    .remove()
                    .then(() => {
                        res.json(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
};

export {
    allpostController,
    getsubpostController,
    createpostController,
    mypostController,
    likeController,
    unlikeController,
    commentController,
    deleteController,
};