import React from 'react'
import Avatar from '../Avatar';
import {cancelSpamPost, deleteSpamPost} from '../../redux/actions/adminAction'
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Carousel from "../Carousel";

const ContentList = ({content}) => {
    const {auth, socket} = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleDeletePost = (post) => {
        dispatch(deleteSpamPost({post, auth, socket}));
    };

    const handleCancelPost = (post) => {
        dispatch(cancelSpamPost({post, auth}));
    };

    return (
        <>
            {content.length > 0 ? (
                content.map((post) => (
                    <div className="content-spam" key={post._id}>
                        <div className="content-spam__main">
                            <span><strong>Số báo cáo:</strong> {post.reports.length}</span>

                            <div className="content-spam__a">
                                <Avatar size="big-avatar" src={post.user.avatar}/>
                                <div className="content-spam__b">
                                    <span><strong>Người đăng:</strong> {post.user.username}</span>
                                    <span><strong>Nội dung:</strong> {post.content}</span>
                                </div>
                                <span className="content-spam__moment">
                                    ~{moment(post.createdAt).fromNow()}
                                </span>
                            </div>

                            <div className="content-spam__A">
                                <button className="btn content-spam__button" onClick={() => handleDeletePost(post)}
                                        style={{marginBottom: "5px"}}>
                                    Xóa
                                </button>
                                <button className="btn content-spam__button" onClick={() => handleCancelPost(post)}>
                                    Hủy
                                </button>
                            </div>
                        </div>

                        <div className="spam_layer" onClick={(e) => {
                            if (e.target.className === "spam_layer") {
                                if (e.target.nextElementSibling.style.display === "block") {
                                    e.target.nextElementSibling.style.display = "none"
                                } else {
                                    e.target.nextElementSibling.style.display = "block"
                                }
                            }
                        }}/>
                        <div className={`collapse_${post._id}`} style={{display: "none"}}>
                            <Carousel images={post.images} id={post._id}/>
                        </div>
                    </div>
                ))
            ) : <h1>Chưa có bài viết nào được báo cáo</h1>
            }
        </>
    );
}

export default ContentList;