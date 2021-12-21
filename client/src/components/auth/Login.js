import React, {useState, useEffect} from "react";

import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/actions/authAction"

const Login = () => {
    const {auth} = useSelector((state) => state);

    const initialState = {email: "", password: ""};
    const [userData, setUserData] = useState(initialState);
    const {email, password} = userData;

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
        dispatch(login(userData));
    };

    return (
        <form className="login--form" onSubmit={handleSubmit}>
            <div className="auth--title">Đăng nhập</div>
            <div className="auth--input-boxes">
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
                {/*<div className="login--text"><a href="#">Quên mật khẩu</a></div>*/}
                <button className="btn auth__button">
                    Đăng nhập
                </button>
            </div>
        </form>
    );
}

export default Login;