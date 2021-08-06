import React from 'react';

import Login from "../components/auth/Login"
import Signup from "../components/auth/Signup"

const Auth = () => {
    return (
        <div className="auth">
            <input type="checkbox" id="flip" className="auth--flip"/>
            <div className="auth--cover">
                <div className="auth--front">
                    <img
                        src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1625940936/background_x6rq9e.jpg"
                        alt="background"/>
                </div>
                <div className="auth--back">
                    <img className="backImg"
                         src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1625940936/background_x6rq9e.jpg"
                         alt="background"/>
                </div>
            </div>
            <div className="auth--content">
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