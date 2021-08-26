import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Main from "./Main";
import {
    getTotalActiveUsers,
    getTotalComments,
    getTotalLikes,
    getTotalPosts,
    getTotalSpamPosts,
    getTotalUsers
} from "../../redux/actions/adminAction";
import User from "./User";
import Spam from "./Spam";

const LeftSide = () => {
    const {auth, socket} = useSelector(state => state);
    const [adminMenu, setAdminMenu] = useState(1);

    const dispatch = useDispatch();

    const handleClickDashboard = () => {
        setAdminMenu(1)
        dispatch(getTotalUsers(auth.token));
        dispatch(getTotalPosts(auth.token));
        dispatch(getTotalComments(auth.token));
        dispatch(getTotalLikes(auth.token));
        dispatch(getTotalSpamPosts(auth.token));
        dispatch(getTotalActiveUsers({auth, socket}));
    }

    return (
        <>
            <div className="admin--left">
                <div className="admin--name">Xin chào: {auth.user.username}</div>
                <div className="admin--control">
                    <div className={`admin--link ${adminMenu === 1 && "admin__active"}`}
                         onClick={handleClickDashboard}>
                        <span>Thống kê</span>
                    </div>
                </div>

                <div className="admin--control">
                    <div className={`admin--link ${adminMenu === 2 && "admin__active"}`}
                         onClick={() => setAdminMenu(2)}>
                        <span>Quản lý user</span>
                    </div>
                </div>

                <div className="admin--control">
                    <div className={`admin--link ${adminMenu === 3 && "admin__active"}`}
                         onClick={() => setAdminMenu(3)}>
                        <span>Quản lý spam</span>
                    </div>
                </div>

                <div className="admin--control">
                    <div className={`admin--link ${adminMenu === 4 && "admin__active"}`}
                         onClick={() => setAdminMenu(4)}>
                        <span>Quản lý bài viết</span>
                    </div>
                </div>
            </div>

            {adminMenu === 1 && <Main/>}
            {adminMenu === 2 && <User/>}
            {adminMenu === 3 && <Spam/>}
        </>
    );
}

export default LeftSide;