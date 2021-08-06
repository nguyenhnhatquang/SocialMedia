import React, {useState, useEffect} from "react";

import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../redux/actions/authAction";

const Signup = () => {
    const {auth} = useSelector((state) => state);

    const initialState = {
        fullName: "",
        username: "",
        email: "",
        password: "",
        gender: "other",
    };
    const [userData, setUserData] = useState(initialState);
    const {fullName, username, email, password} = userData;

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.token) history.push("/");
    }, [auth.token, history]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(userData));
    };

    return (
        <form className="signup--form" onSubmit={handleSubmit}>
            <div className="auth--title">Đăng ký</div>
            <div className="auth--input-boxes">
                <div className="auth--input-box">
                    <i className="fas fa-user"></i>
                    <input
                        type="text"
                        placeholder="Nhập tên của bạn"
                        name="fullName"
                        value={fullName}
                        autoComplete="name"
                        onChange={handleChangeInput}
                        required
                        autoFocus
                    />
                </div>
                <div className="auth--input-box">
                    <i className="fas fa-user"></i>
                    <input
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        name="username"
                        value={username}
                        autoComplete="username"
                        onChange={handleChangeInput}
                        required
                    />
                </div>
                <div className="auth--input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                        type="text"
                        placeholder="Nhập email"
                        name="email"
                        value={email}
                        autoComplete="email"
                        onChange={handleChangeInput}
                        required
                        autoFocus
                    />
                </div>
                <div className="auth--input-box">
                    <i className="fas fa-lock"></i>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        name="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={handleChangeInput}
                        required
                    />
                </div>
                <div className="signup--gender-details">
                    <div className="signup--gender">
                        <input type="radio" name="gender" value="male" onChange={handleChangeInput}/>
                        <span>Nam</span>
                    </div>
                    <div className="signup--gender">
                        <input type="radio" name="gender" value="female" onChange={handleChangeInput}/>
                        <span>Nữ</span>
                    </div>
                    <div className="signup--gender">
                        <input type="radio" name="gender" value="other" onChange={handleChangeInput} defaultChecked/>
                        <span>Khác</span>
                    </div>
                </div>
                <div className="auth--button">
                    <input type="submit" value="Đăng ký"/>
                </div>
            </div>
        </form>
    );
}

export default Signup;