import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "./PostCard";
import LoadMoreButton from "../LoadMoreButton";
import { getDataAPI } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/actions/postAction";

const LoadIcon = 'https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1628335180/Spinner-0.5s-200px_s19crb.gif'

const Posts = () => {
    const { homePosts, auth, theme } = useSelector((state) => state);
    const dispatch =  useDispatch();

    const [load, setLoad] = useState(false);

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token);
        dispatch({ type: POST_TYPES.GET_POSTS, payload: {...res.data, page: homePosts.page + 1 } });
        setLoad(false);
    };
    return (
        <div className="home-posts">
            {homePosts.posts.map((post) => (
                <PostCard key={post._id} post={post} theme={theme} />
            ))}

            {load && (
                <img src={LoadIcon} alt="Loading..." className="loading__profile" />
            )}

            <LoadMoreButton
                result={homePosts.result}
                page={homePosts.page}
                load={load}
                handleLoadMore={handleLoadMore}
            />
        </div>
    );
};

export default Posts;