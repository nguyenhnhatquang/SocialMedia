import React, {useState, useEffect} from 'react'

import {Link} from 'react-router-dom'
import LikeButton from '../../LikeButton'
import {useSelector, useDispatch} from 'react-redux'
import {likePost, unLikePost, savePost, unSavePost} from '../../../redux/actions/postAction'

const CardFooter = ({post}) => {
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const {auth, socket} = useSelector(state => state)

    const dispatch = useDispatch();

    const [saved, setSaved] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)

    // Likes
    useEffect(() => {
        if (post.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true)
        } else {
            setIsLike(false)
        }
    }, [post.likes, auth.user._id])

    const handleLike = async () => {
        if (loadLike) return;

        setLoadLike(true)
        await dispatch(likePost({post, auth, socket}))
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if (loadLike) return;

        setLoadLike(true)
        await dispatch(unLikePost({post, auth, socket}))
        setLoadLike(false)
    }

    // Saved
    useEffect(() => {
        if (auth.user.saved.find(id => id === post._id)) {
            setSaved(true)
        } else {
            setSaved(false)
        }
    }, [auth.user.saved, post._id])

    const handleSavePost = async () => {
        if (saveLoad) return;

        setSaveLoad(true)
        await dispatch(savePost({post, auth}))
        setSaveLoad(false)
    }

    const handleUnSavePost = async () => {
        if (saveLoad) return;

        setSaveLoad(true)
        await dispatch(unSavePost({post, auth}))
        setSaveLoad(false)
    }

    return (
        <div className="card-footer">
            <div className="card-footer_like">
                <LikeButton
                    className={"card-footer_icon-button"}
                    isLike={isLike}
                    handleLike={handleLike}
                    handleUnLike={handleUnLike}
                />
                <span className="card-footer_count">{post.likes.length}</span>
            </div>

            <Link to={`/post/${post._id}`} className="card-footer_comment">
                <img
                    className="card-footer_icon-button"
                    src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627477286/icon/comments_okihza.svg"
                    alt="heart"
                    onClick={handleUnLike}
                />
                <span className="card-footer_count">{post.comments.length}</span>
            </Link>

            <div className="card-footer_save">
                {saved ? (
                    <img
                        className="card-footer_icon-button"
                        src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627477470/icon/bookmark_full_oxk6mm.svg"
                        alt="heart"
                        onClick={handleUnSavePost}
                    />
                ) : (
                    <img
                        className="card-footer_icon-button"
                        src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627477490/icon/bookmark_nbhzjk.svg"
                        alt="heart"
                        onClick={handleSavePost}
                    />
                )}
            </div>
        </div>
    )
}

export default CardFooter
