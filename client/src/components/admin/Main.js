import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {
    getTotalUsers,
    getTotalPosts,
    getTotalComments,
    getTotalLikes,
    getTotalActiveUsers,
    getTotalSpamPosts,
} from "../../redux/actions/adminAction";

const Main = () => {
    const {auth, admin, socket} = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotalUsers(auth.token));
        dispatch(getTotalPosts(auth.token));
        dispatch(getTotalComments(auth.token));
        dispatch(getTotalLikes(auth.token));
        dispatch(getTotalSpamPosts(auth.token));
        dispatch(getTotalActiveUsers({auth, socket}));
    }, [dispatch, auth.token, socket, auth]);

    return (
        <div className="admin--right">
            <div className="admin--cards">
                <div className="admin--card" style={{background: "#F8F6F9"}}>
                    <i className="fa fa-users fa-2x"/>
                    <div className="admin--card-content">
                        <p>Tổng số user</p>
                        <span>{admin.total_users}</span>
                    </div>
                </div>

                <div className="admin--card" style={{background: "#E9F1F4"}}>
                    <i className="fa fa-comments fa-2x"/>
                    <div className="admin--card-content">
                        <p>Tổng số bình luận</p>
                        <span>{admin.total_comments}</span>
                    </div>
                </div>

                <div className="admin--card" style={{background: "#D0E1E8"}}>
                    <i className="fa fa-camera fa-2x"/>
                    <div className="admin--card-content">
                        <p>Tổng số bài viết</p>
                        <span>{admin.total_posts}</span>
                    </div>
                </div>

                <div className="admin--card" style={{background: "#E6D6D6"}}>
                    <i className="fa fa-thumbs-up fa-2x"/>
                    <div className="admin--card-content">
                        <p>Tổng số lượt thích</p>
                        <span>{admin.total_likes}</span>
                    </div>
                </div>

                <div className="admin--card" style={{background: "#B1C3CD"}}>
                    <i className="fa fa-ban fa-2x"/>
                    <div className="admin--card-content">
                        <p>Bài viết bị báo cáo</p>
                        <span>{admin.total_spam_posts}</span>
                    </div>
                </div>

                <div className="admin--card" style={{background: "#547ad2"}}>
                    <i className="fa fa-check-circle fa-2x"/>
                    <div className="admin--card-content">
                        <p>Số user đang hoạt động</p>
                        <span>{admin.total_active_users}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;