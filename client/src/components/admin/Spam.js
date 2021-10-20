import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ContentList from "./ContentList";
import {getSpamPosts} from '../../redux/actions/adminAction';

const Spam = () => {
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

export default Spam;