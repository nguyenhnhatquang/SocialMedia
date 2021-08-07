import React, { useState, useEffect } from "react";
import PostThumb from "../PostThumb";
import LoadMoreButton from "../LoadMoreButton";
import { getDataAPI } from "../../utils/fetchData";
import { PROFILE_TYPES } from "../../redux/actions/profileAction";

const LoadIcon = 'https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1628335180/Spinner-0.5s-200px_s19crb.gif'

const Posts = ({ auth, profile, dispatch, id }) => {
    const [posts, setPosts] = useState([]);
    const [result, setResult] = useState(9);
    const [page, setPage] = useState(0);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        profile.posts.forEach((data) => {
            if (data._id === id) {
                setPosts(data.posts);
                setResult(data.result);
                setPage(data.page);
            }
        });
    }, [profile.posts, id]);

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataAPI(
            `user_posts/${id}?limit=${page * 9}`,
            auth.token
        );
        const newData = { ...res.data, page: page + 1, _id: id };
        dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });
        setLoad(false);
    };
    return (
        <>
            <PostThumb posts={posts} result={result} />

            {load && (
                <img src={LoadIcon} alt="Loading..."/>
            )}

            <LoadMoreButton
                result={result}
                page={page}
                load={load}
                handleLoadMore={handleLoadMore}
            />
        </>
    );
};

export default Posts;