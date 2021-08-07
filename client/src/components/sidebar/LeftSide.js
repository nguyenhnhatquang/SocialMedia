import React  from "react";
import Avatar from "../Avatar";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const LeftSide = () => {
    const {auth} = useSelector(state => state)
    return(
        <div className="left-side">

            <Link to={`/profile/${auth.user._id}`} className="left-side__avatar">
                <Avatar src={auth.user.avatar} size="big-avatar" />
                <div className="left-side__avatar_info">
                    <strong>{auth.user.fullName}</strong>
                    <span>@{auth.user.username}</span>
                </div>
            </Link>

            <ul className="left-side__items">
                <li>
                    <Link className="left-side_link">
                        <img className="left-side_item"
                             src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626972126/icon/friends_u2pjpg.svg"
                             alt="message"/>
                        <span>Bạn bè</span>
                    </Link>
                </li>
                <li>
                    <img className="left-side_item"
                         src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626972440/icon/networking_dvzt4z.svg"
                         alt="message"/>
                    <span>Nhóm</span>
                </li>
                <li>
                    <Link to={`/discover`} className="left-side_link">
                        <img className="left-side_item"
                             src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626972686/icon/compass_xjczoa.svg"
                             alt="message"/>
                        <span>Khám phá</span>
                    </Link>
                </li>
                <li>
                    <img className="left-side_item"
                         src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626972877/icon/video_z4in4a.svg"
                         alt="message"/>
                    <span>Video</span>
                </li>
                <li>
                    <img className="left-side_item"
                         src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626972933/icon/statistics_dnm5ot.svg"
                         alt="message"/>
                    <span>Thống kê</span>
                </li>
            </ul>
        </div>
    );
}

export default LeftSide;