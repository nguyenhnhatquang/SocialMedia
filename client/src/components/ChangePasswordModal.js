import React, {useState} from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../redux/actions/globalTypes'
import {changePassword} from "../redux/actions/authAction";

const StatusModal = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [cnfNewPassword, setCnfNewPassword] = useState("");
    const {auth} = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(changePassword({oldPassword, newPassword, cnfNewPassword, auth}));
        dispatch({type: GLOBALTYPES.CHANGE_PASSWORD, payload: false});
    };

    return (
        <div className="change-password" onSubmit={handleSubmit} onClick={(e) => {
            if(e.target.className === "change-password") {
                dispatch({type: GLOBALTYPES.CHANGE_PASSWORD, payload: false})
            }
        }}>
            <form className="change-password_form">
                <div className="change-password_header">
                    <span className="change-password_header-title">Đổi mật khẩu</span>
                    <img
                        className="search--close"
                        src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626912787/icon/error_l9krog.svg"
                        alt="close"
                        onClick={() => dispatch({type: GLOBALTYPES.CHANGE_PASSWORD, payload: false})}
                    />
                </div>
                <div className="change-password_body">
                    <div className="change-password_body-items">
                        <label htmlFor="oldPassword" className="change-password_body-items-label">Mật khẩu hiện
                            tại</label>
                        <input
                            type="text"
                            id="oldPassword"
                            name="oldPassword"
                            value={oldPassword}
                            autoFocus
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="change-password_body-items-input"
                        />
                    </div>
                    <div className="change-password_body-items">
                        <label htmlFor="oldPassword" className="change-password_body-items-label">Mật khẩu mới</label>
                        <input
                            type="text"
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="change-password_body-items-input"
                        />
                    </div>
                    <div className="change-password_body-items">
                        <label htmlFor="oldPassword" className="change-password_body-items-label">Xác nhận mật
                            khẩu</label>
                        <input
                            type="text"
                            id="cnfNewPassword"
                            name="cnfNewPassword"
                            value={cnfNewPassword}
                            onChange={(e) => setCnfNewPassword(e.target.value)}
                            className="change-password_body-items-input"
                        />
                    </div>
                </div>

                <button className="change-password_submit" type="submit"
                        disabled={oldPassword && newPassword && cnfNewPassword ? false : true}>
                    Cập nhật
                </button>
            </form>
        </div>
    );
}

export default StatusModal
