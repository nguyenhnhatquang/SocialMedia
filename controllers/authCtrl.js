const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validFullName, validUsername, validEmail, validPassword} = require("../utils/Validate");

const authCtrl = {
    register: async (req, res) => {
        try {
            const {fullName, username, email, password, gender} = req.body;

            let newUserName = username.toLowerCase().replace(/ /g, "");

            let valid = validFullName(fullName) || validUsername(username) || validPassword(password) || validEmail(email);

            if (valid) {
                return res.status(400).json({msg: valid});
            }

            const userByName = await Users.findOne({username: newUserName});
            if (userByName) {
                return res.status(400).json({msg: `Đã tồn tại tài khoản này ${newUserName}`});
            }

            const userByEmail = await Users.findOne({email});
            if (userByEmail) {
                return res
                    .status(400)
                    .json({msg: `Đã tồn tại email này ${email}`});
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new Users({
                fullName,
                username: newUserName,
                email,
                password: passwordHash,
                gender,
            });

            const access_token = createAccessToken({id: newUser._id});
            const refresh_token = createRefreshToken({id: newUser._id});

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 1000, // Thời gian tồn tại 30 ngày
            });

            await newUser.save();

            res.json({
                msg: "Đăng ký thành công",
                access_token,
                user: {
                    ...newUser._doc,
                    password: "",
                },
            });
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    changePassword: async (req, res) => {
        try {
            const {oldPassword, newPassword} = req.body;

            const user = await Users.findOne({_id: req.user._id});

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({msg: "Mật khẩu cũ không chính xác"});
            }

            if (validPassword(newPassword)) {
                return res.status(400).json({msg: validPassword(newPassword)});
            }

            const newPasswordHash = await bcrypt.hash(newPassword, 12);

            await Users.findOneAndUpdate(
                {_id: req.user._id},
                {password: newPasswordHash}
            );

            res.json({msg: "Cập nhật mật khẩu thành công"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    registerAdmin: async (req, res) => {
        try {
            const {fullName, username, email, password, gender, role} = req.body;

            let newUserName = username.toLowerCase().replace(/ /g, "");

            let valid = validFullName(fullName) || validUsername(username) || validPassword(password) || validEmail(email);
            if (valid) {
                return res.status(400).json({msg: valid});
            }

            const user_name = await Users.findOne({username: newUserName});
            if (user_name) {
                return res.status(400).json({msg: `Đã tồn tại tài khoản này ${newUserName}`});
            }

            const user_email = await Users.findOne({email});
            if (user_email) {
                return res
                    .status(400)
                    .json({msg: `Đã tồn tại email này ${email}`});
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new Users({
                fullName,
                username: newUserName,
                email,
                password: passwordHash,
                gender,
                role,
            });

            await newUser.save();

            res.json({msg: "Đăng ký tài khoản admin thành công"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email, role: "user"}).populate(
                "followers following friends",
                "-password"
            );

            if (!user) {
                return res.status(400).json({msg: "Email hoặc mật khẩu không chính xác"});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({msg: "Email hoặc mật khẩu không chính xác"});
            }

            const access_token = createAccessToken({id: user._id});
            const refresh_token = createRefreshToken({id: user._id});

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            res.json({
                msg: "Đăng nhập thành công",
                access_token,
                user: {
                    ...user._doc,
                    password: "",
                },
            });
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    adminLogin: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email, role: "admin"});

            if (!user) {
                return res.status(400).json({msg: "Email hoặc mật khẩu không chính xác"});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({msg: "Email hoặc mật khẩu không chính xác"});
            }

            const access_token = createAccessToken({id: user._id});
            const refresh_token = createRefreshToken({id: user._id});

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            res.json({
                msg: "Đăng nhập thành công",
                access_token,
                user: {
                    ...user._doc,
                    password: "",
                },
            });
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", {path: "/api/refresh_token"});
            return res.json({msg: "Đăng xuất thành công"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;

            if (!rf_token) {
                return res.status(400).json({msg: "Xin vui lòng đăng nhập lại"});
            }

            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, result) => {
                    if (err) {
                        res.status(400).json({msg: "Xin vui lòng đăng nhập lại"});
                    }

                    const user = await Users.findById(result.id)
                        .select("-password")
                        .populate("followers following friends", "-password");

                    if (!user) {
                        res.status(400).json({msg: "Tài khoản không tồn tại"});
                    }

                    const access_token = createAccessToken({id: result.id});
                    res.json({access_token, user});
                }
            );
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = authCtrl;
