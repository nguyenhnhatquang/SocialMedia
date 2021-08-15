import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import {deleteComment, likeComment, unLikeComment, updateComment} from "../../../redux/actions/commentAction";
import Avatar from "../../Avatar";
import LikeButton from "../../LikeButton";
import InputComment from "../InputComment";


const CommentCard = ({children, comment, post, commentId}) => {
    const {auth, socket} = useSelector(state => state)
    const dispatch = useDispatch()

    const [content, setContent] = useState('')

    const [onEdit, setOnEdit] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const [onReply, setOnReply] = useState(false)


    useEffect(() => {
        setContent(comment.content)
        setIsLike(false)
        setOnReply(false)
        if (comment.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true)
        }
    }, [comment, auth.user._id])

    const handleUpdate = () => {
        if (comment.content !== content) {
            dispatch(updateComment({comment, post, content, auth}))
            setOnEdit(false)
        } else {
            setOnEdit(false)
        }
    }


    const handleLike = async () => {
        if (loadLike) return;
        setIsLike(true)

        setLoadLike(true)
        await dispatch(likeComment({comment, post, auth}))
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if (loadLike) return;
        setIsLike(false)

        setLoadLike(true)
        await dispatch(unLikeComment({comment, post, auth}))
        setLoadLike(false)
    }


    const handleReply = () => {
        if (onReply) return setOnReply(false)
        setOnReply({...comment, commentId})
    }

    const handleRemove = () => {
        if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
            dispatch(deleteComment({post, auth, comment, socket}));
        }
    };

    return (
        <div className="commentCard" style={{flexDirection: "column"}}>
            <div className="commentCard">
                <div className="commentCard-avatar">
                    <Avatar
                        src={comment.user.avatar}
                        size="medium-avatar"
                    />
                </div>

                <div className="commentCard-content">
                    <div className="commentCard-content_text">
                        <Link to={`/profile/${comment.user._id}`} className="commentCard-content_name">
                            {comment.user.fullName}
                        </Link>

                        <div>
                            {onEdit ? (
                                <textarea
                                    className="commentCard-content_textArea"
                                    rows="3"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            ) : (
                                <div>
                                    {comment.tag && comment.tag._id !== comment.user._id && (
                                        <Link to={`/profile/${comment.tag._id}`} style={{marginRight: "5px", fontWeight: "500"}}>
                                            @{comment.tag.username}
                                        </Link>
                                    )}
                                    <span>{content}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="commentCard-content_button">
                        {onEdit ? (
                            <div className="commentCard-content_button-item">
                                <small style={{marginRight: "10px"}} onClick={handleUpdate}>
                                    Xong
                                </small>
                                <small onClick={() => setOnEdit(false)}>
                                    Huỷ
                                </small>
                            </div>
                        ) : (
                            <small className="commentCard-content_button-item" onClick={handleReply}>
                                {onReply ? "Huỷ" : "Trả lời"}
                            </small>
                        )}

                        <span className="commentCard-content_button-date">
                        {moment(comment.createdAt).fromNow()}
                    </span>
                    </div>

                    {comment.likes.length > 0 && (
                        <div className="commentCard-likeCount">
                            <img
                                src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627476034/icon/heart_full_jgml7q.svg"
                                alt="heart"
                            />
                            <span>{comment.likes.length}</span>
                        </div>
                    )}

                    <LikeButton
                        className="commentCard-likeButton"
                        isLike={isLike}
                        handleLike={handleLike}
                        handleUnLike={handleUnLike}
                    />
                </div>

                <div className="commentCard-menu">
                    <input
                        className="card-header_dropDown-input"
                        id={`card-header_${commentId}`}
                        type="checkbox"
                    />
                    <label htmlFor={`card-header_${commentId}`}>
                        <img
                            className="left-side__svg"
                            src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627459882/icon/more_u9f94p.svg"
                            alt="more"
                        />
                    </label>

                    <div className="card-header_dropDown-menu" style={{width:"60px"}}>
                        {/* Người cmt có thể sửa */}
                        {
                            comment.user._id === auth.user._id && (
                                <div className="card-header_dropDown-item" onClick={() => setOnEdit(true)}>
                                    Sửa
                                </div>
                            )
                        }

                        {/* Chủ bài post với cmt có thể xoá */}
                        {
                            (post.user._id === auth.user._id ||
                                comment.user._id === auth.user._id) && (
                                <div className="card-header_dropDown-item" onClick={handleRemove}>
                                    Xoá
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {onReply && (
                <div className="commentCard-reply">
                    <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
                        <Link to={`/profile/${onReply.user._id}`}>
                            @{onReply.user.username}:
                        </Link>
                    </InputComment>
                </div>
            )}

            {children}
        </div>
    )
}

export default CommentCard
