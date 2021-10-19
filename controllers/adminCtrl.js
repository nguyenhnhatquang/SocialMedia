const Posts = require("../models/postModel");
const Users = require("../models/userModel");
const Comments = require("../models/commentModel");

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const adminCtrl = {
    getTotalUsers: async (req, res) => {
        try {
            const users = await Users.find();
            const total_users = users.length;
            res.json({total_users});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    getTotalPosts: async (req, res) => {
        try {
            const posts = await Posts.find();
            const total_posts = posts.length;
            res.json({total_posts});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    getTotalComments: async (req, res) => {
        try {
            const comments = await Comments.find();
            const total_comments = comments.length;
            res.json({total_comments});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    getTotalLikes: async (req, res) => {
        try {
            const posts = await Posts.find();
            let total_likes = 0;
            await posts.map((post) => (total_likes += post.likes.length));
            res.json({total_likes});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    getTotalSpamPosts: async (req, res) => {
        try {
            const posts = await Posts.find({
                $nor: [{reports: {$size: 0}}]
            });

            const total_spam_posts = posts.length;
            res.json({total_spam_posts});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    getSpamPosts: async (req, res) => {
        try {
            const spamPosts = await Posts.find({
                $nor: [{reports: {$size: 0}}]
            })
                .select("user createdAt reports content images")
                .populate({path: "user", select: "username avatar email"});

            res.json({spamPosts});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    deleteSpamPost: async (req, res) => {
        try {
            const post = await Posts.findOneAndDelete({
                _id: req.params.id,
            });

            await Comments.deleteMany({_id: {$in: post.comments}});

            res.json({msg: "Xoá bài đăng thành công"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    getUsers: async (req, res) => {
        try {
            const features = new APIfeatures(
                Posts.find({
                    user: [...req.user.following, req.user._id],
                }),
                req.query
            ).paginating();

            const user = await features.query
                .populate("user likes", "avatar username fullName followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes ",
                        select: "-password",
                    },
                });

            res.json({
                msg: "Thành công",
                result: user.length,
                user,
            });

        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
};

module.exports = adminCtrl;
