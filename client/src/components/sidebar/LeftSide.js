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
                    <Link to={`/friends`} className="left-side_link">
                        <img className="left-side__svg"
                             src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626972126/icon/friends_u2pjpg.svg"
                             alt="message"/>
                        <span>Bạn bè</span>
                    </Link>
                </li>

                <li>
                    <Link to={`/discover`} className="left-side_link">
                        <img className="left-side__svg"
                             src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626972877/icon/video_z4in4a.svg"
                             alt="message"/>
                        <span>Khám phá</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default LeftSide;