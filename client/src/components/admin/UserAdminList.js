import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSpamPosts} from '../../redux/actions/adminAction';

const UserAdminList = () => {
    const {auth, admin} = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpamPosts(auth.token));
    }, [dispatch, auth.token])

    return (
        <div className="admin--right">
            <div className="admin--right-spam">
                <ContentList content={admin.spam_posts}/>
            </div>
        </div>
    );
};

export default UserAdminList;