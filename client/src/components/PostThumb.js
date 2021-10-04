import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const PostThumb = ({posts, result}) => {
    const {theme} = useSelector((state) => state);

    if (result === 0) {
        return <h2 style={{marginTop: "10px"}}>Không có bài viết</h2>
    }

    const imageShow = (src) => {
        return (
            <img
                src={src}
                alt={src}
                style={{filter: theme ? "invert(1)" : "invert(0)"}}
            />
        );
    };

    const videoShow = (src) => {
        return (
            <video
                controls
                src={src}
                alt={src}
                style={{filter: theme ? "invert(1)" : "invert(0)"}}
            />
        );
    };
    return (
        <div className="post_thumb">
            {posts && posts.map((post) => (
                <Link to={`/post/${post._id}`} key={post._id}>
                    <div className="post_thumb_display">
                        {post.images[0].url.match(/video/i)
                            ? videoShow(post.images[0].url, theme)
                            : imageShow(post.images[0].url, theme)
                        }

                        <div className="post_thumb_menu">
                            <i className="far fa-heart">{post.likes.length}</i>
                            <i className="far fa-comments">{post.comments.length}</i>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default PostThumb