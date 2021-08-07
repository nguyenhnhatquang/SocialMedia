import React, {useEffect} from "react";
import Avatar from "../../Avatar";
import {Link, useHistory} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {deletePost, reportPost} from "../../../redux/actions/postAction";
import {GLOBALTYPES} from "../../../redux/actions/globalTypes";

const CardHeader = ({post}) => {
    const {auth, socket} = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleEditPost = () => {
        dispatch({type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}});
    };

    const handleDeletePost = () => {
        if (window.confirm("Bạn có thực sự muốn xoá?")) {
            dispatch(deletePost({post, auth, socket}));
            return history.push("/");
        }
    };

    const handleReportPost = () => {
        dispatch(reportPost({post, auth}));
    };

    return (
        <div className="card-header">
            <div className="card-header_avatar">
                <Avatar src={post.user.avatar} size="big-avatar"/>
            </div>

            <div className="card-header_user">
                <span>
                    <Link to={`/profile/${post.user._id}`} className="card-header_user-name">
                        {post.user.fullName}
                    </Link>
                </span>
                <span className="card-header_user-createdAt">
                    {moment(post.createdAt).format("LLLL")}
                </span>
            </div>

            <div className="card-header_dropDown">
                <input
                    className="card-header_dropDown-input"
                    id={`card-header_${post._id}`}
                    type="checkbox"
                />
                <label htmlFor={`card-header_${post._id}`}>
                    <img
                        className="left-side__svg"
                        src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627459882/icon/more_u9f94p.svg"
                        alt="more"
                    />
                </label>

                <div className="card-header_dropDown-menu">
                    {auth.user._id === post.user._id ? (
                            <>
                                <div className="card-header_dropDown-item" onClick={handleEditPost}>
                                    Chỉnh Sửa
                                </div>
                                <div className="card-header_dropDown-item" onClick={handleDeletePost}>
                                    Xoá
                                </div>
                            </>
                        ) :
                        (
                            <div className="card-header_dropDown-item" onClick={handleReportPost}>
                                Báo cáo
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default CardHeader;