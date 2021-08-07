import React from 'react';

import Login from "../components/auth/Login"
import Signup from "../components/auth/Signup"

const Auth = () => {
    return (
        <div className="auth">
            <input type="checkbox" className="auth__flip" id="flip"/>
            <div className="auth__cover">
                <div className="auth__cover_front">
                    <img
                        src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1625940936/background_x6rq9e.jpg"
                        alt="background"
                    />
                </div>
                <div className="auth__cover_back">
                    <img
                         src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1625940936/background_x6rq9e.jpg"
                         alt="background"
                    />
                </div>
            </div>

            <div className="auth__main">
                <div className="auth--login">
                    <Login/>
                    <span>
                        Bạn chưa có tài khoản? <label htmlFor="flip" className="auth--label">Đăng ký ngay</label>
                    </span>
                </div>
                <div className="auth--signup">
                    <Signup/>
                    <span>
                        Đã có tài khoản? <label htmlFor="flip" className="auth--label">Đăng nhập</label>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Auth;