import React from 'react'
import Avatar from '../Avatar';
import {deleteSpamPost} from '../../redux/actions/adminAction'
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

const ContentList = ({content}) => {
    const {auth, socket} = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleDeletePost = (post) => {
        dispatch(deleteSpamPost({post, auth, socket}));
    };

    return (
        <>
            {content.length > 0 ? (
                content.map((post) => (
                    <div className="content-spam">
                        <span>Báo cáo: {post.reports.length}</span>

                        <div className="content-spam__a">
                            <Avatar size="big-avatar" src={post.user.avatar}/>
                            <div className="content-spam__b">
                                <span>Tên: {post.user.username}</span>
                                <span>Nội dung: {post.content}</span>
                            </div>
                            <span className="">
                              ~{moment(post.createdAt).fromNow()}
                            </span>
                        </div>

                        <div className="" onClick={() => handleDeletePost(post)}>
                            Xóa
                        </div>
                    </div>
                ))
            ) : <h1>Chưa có bài viết nào được báo cáo</h1>
            }
        </>
    );
}

export default ContentList;