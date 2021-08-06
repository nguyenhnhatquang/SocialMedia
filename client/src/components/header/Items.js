import React, {useState} from "react";
import {Link} from "react-router-dom"
import Avatar from "../Avatar";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/actions/authAction";
import {GLOBALTYPES} from "../../redux/actions/globalTypes";

const Items = () => {
    const [check, setCheck] = useState(false);
    const {auth, notify} = useSelector((state) => state);
    const dispatch = useDispatch();
    return (
        <div className="header-items--container">

            <div className="header--items" style={{marginRight: "7px"}}>
                <Link to="/message" style={{marginTop: "5px"}}>
                    <img className="header-items--item"
                         src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626911007/icon/messenger_mdvyiu.svg"
                         alt="message"/>
                </Link>
            </div>

            <div className="header--items" style={{marginRight: "7px", marginLeft: "7px"}}>
                <Link style={{marginTop: "5px"}}>
                    <img className="header-items--item"
                         src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626911353/icon/notification_pdi7ow.svg"
                         alt="message"/>
                </Link>
            </div>

            <div className="header--items" style={{marginRight: "7px", marginLeft: "7px"}}>
                <Link style={{marginTop: "5px"}}>
                    <img className="header-items--item"
                         src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627072775/icon/night_mc6qyb.svg"
                         alt="message"/>
                </Link>
            </div>

            <input type="checkbox" className="header--checkbox" checked={check}/>
            <div className="header--items header--dropdown_menu"
                 style={{marginLeft: "7px"}}
                 onClick={() => setCheck(!check)}>
                <Avatar src={auth.user.avatar} size="medium-avatar"/>
                <img className="header-items--item_arrow"
                     src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626918789/icon/down-arrow_xdmdlc.svg"
                     alt="message"/>
            </div>
            <ul className="header--ul">
                <li className="header--li">
                    <Link
                        className="header--li_profile"
                        to={`/profile/${auth.user._id}`}
                    >
                        <Avatar src={auth.user.avatar} size="big-avatar"/>
                        <div>
                            <strong>{auth.user.username}</strong>
                            <span>Xem trang cá nhân</span>
                        </div>
                    </Link>
                </li>
                <li className="header--li" onClick={() => dispatch({type: GLOBALTYPES.CHANGE_PASSWORD, payload: true})}>
                    <div className="header--li_logout">
                        <img className="header-items--item_logout"
                             src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627688858/icon/key_wsxvsj.svg"
                             alt="message"/>
                        <span>Đổi mật khẩu</span>
                    </div>
                </li>
                <li className="header--li" style={{borderBottom: "none"}} onClick={() => dispatch(logout())}>
                    <Link className="header--li_logout" to="/auth">
                        <img className="header-items--item_logout"
                             src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626926472/icon/logout_mqcubj.svg"
                             alt="message"/>
                        <span>Đăng xuất</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Items