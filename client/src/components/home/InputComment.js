import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {createComment} from "../../redux/actions/commentAction";

const InputComment = ({children, post, onReply, setOnReply}) => {
    const [content, setContent] = useState("");

    const {auth, socket} = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) {
            if (setOnReply) return setOnReply(false);
            return;
        }

        setContent("");

        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user,
        };

        dispatch(createComment({post, newComment, auth, socket}));

        if (setOnReply) return setOnReply(false);
    };

    return (
        <form className="inputComment" onSubmit={handleSubmit}>
            {children}
            <div className="inputComment-main">
                <input
                    className="inputComment-main_input"
                    type="text"
                    placeholder="Viết bình luận..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <span className="inputComment-main_submit" type="submit" onClick={handleSubmit}>
                    <i className="far fa-paper-plane"></i>
                </span>
            </div>
        </form>
    );
};

export default InputComment;
