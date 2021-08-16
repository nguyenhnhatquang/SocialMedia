import React, {useState} from "react";
import {Link} from "react-router-dom"
import Avatar from "../Avatar";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/actions/authAction";
import {GLOBALTYPES} from "../../redux/actions/globalTypes";
import IconHeader from "./IconHeader";
import NotifyModal from "../NotifyModal";

const Items = () => {
    const [check, setCheck] = useState(false);
    const [checkNotify, setCheckNotify] = useState(false);
    const {auth, notify} = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div className="header__items">
            <div className="header__items_item phone">
                <Link to="/">
                    <IconHeader type="home"/>
                </Link>
            </div>

            <div className="header__items_item phone">
                <Link to="/discover">
                    <IconHeader type="compass"/>
                </Link>
            </div>

            <div className="header__items_item">
                <Link to="/message">
                    <IconHeader type="message"/>
                </Link>
            </div>

            <input type="checkbox" className="header--check__notify" checked={checkNotify}/>
            <div className="header__items_item header--dropdown" onClick={() => setCheckNotify(!checkNotify)}>
                <IconHeader type="notification" notify={notify}/>
                <div className="header--menuitem__notify">
                    <NotifyModal />
                </div>
            </div>

            <input type="checkbox" className="header--check" checked={check}/>
            <div className="header__items_item header--dropdown" onClick={() => setCheck(!check)}>
                <IconHeader type="sortDown"/>

                <ul className="header--menuitem">
                    <li className="header--item">
                        <Link className="header__profile" to={`/profile/${auth.user._id}`}>
                            <Avatar src={auth.user.avatar} size="big-avatar"/>
                            <div>
                                <strong>{auth.user.username}</strong>
                                <span>Xem trang cá nhân</span>
                            </div>
                        </Link>
                    </li>

                    <li className="header--item people">
                        <Link to="/friends" className="header__logout" >
                            <IconHeader type="people"/>
                            <span style={{marginLeft: "10px"}}>Bạn bè</span>
                        </Link>
                    </li>
                    <li className="header--item"
                        onClick={() => dispatch({type: GLOBALTYPES.CHANGE_PASSWORD, payload: true})}>
                        <IconHeader type="key"/>
                        <span style={{marginLeft: "10px"}}>Đổi mật khẩu</span>
                    </li>

                    <li className="header--item" style={{borderBottom: "none"}} onClick={() => dispatch(logout())}>
                        <Link className="header__logout" to="/auth">
                            <IconHeader type="logout"/>
                            <span style={{marginLeft: "10px"}}>Đăng xuất</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Items