const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validFullName, validUsername, validEmail, validPassword, removeAccents} = require("../utils/Validate");
const sendEmail = require("../utils/SendEmail");

const authCtrl = {
    register: async (req, res) => {
        try {
            const {fullName, username, email, password, gender} = req.body;

            let valid = validFullName(fullName) || validUsername(username) || validPassword(password) || validEmail(email);

            let newUserName = username.toLowerCase().replace(/ /g, "");

            newUserName = removeAccents(newUserName);

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

            await newUser.save();

            const htmlText = "<p>Cảm ơn bạn đã đăng ký vui lòng click vào <a href='https://socialmedia-quang.herokuapp.com/api/confirm?email=" + email + "'>đây</a> để xác minh</p>";
            await sendEmail({
                subject: "Thank!",
                to: email,
                from: "autonhatquang2609@gmail.com",
                html: htmlText
            });

            res.json({
                msg: "Đăng ký thành công, vui lòng vào email để xác nhận!",
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

    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email}).populate(
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

            if (user.status === false) {
                return res.status(400).json({msg: "Tài khoản của bạn bị khóa vui lòng liên hệ email: nguyenhnhatquang@gmail.com"});
            }

            if (user.confirmMail === false) {
                return res.status(400).json({msg: "Tài khoản chưa xác nhận email. Vui lòng xác nhận email để đăng nhập."});
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

    confirmEmail: async (req, res) => {
        try {
            const email = req.query.email;
            await Users.findOneAndUpdate(
                {email: email},
                {confirmMail: true}
            )

            res.json({
                msg: "Xác nhận email thành công",
            });
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
