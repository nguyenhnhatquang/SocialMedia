import React, { useState, useEffect } from "react";
import PostThumb from "../PostThumb";
import LoadMoreButton from "../LoadMoreButton";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const LoadIcon = 'https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1628335180/Spinner-0.5s-200px_s19crb.gif'

const Saved = ({ auth, dispatch }) => {
    const [savePosts, setSavePosts] = useState([]);
    const [result, setResult] = useState(9);
    const [page, setPage] = useState(2);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true);
        getDataAPI(`getSavePosts`, auth.token)
            .then(res => {
                setSavePosts(res.data.savePosts)
                setResult(res.data.result)
                setLoad(false)
            })
            .catch(err => {
                dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
            })

        return () => setSavePosts([]);
    }, [dispatch, auth.token]);

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token);
        setSavePosts(res.data.savePosts);
        setResult(res.data.result);
        setPage(page + 1);
        setLoad(false);
    };


    return (
        <>
            <PostThumb posts={savePosts} result={result} />

            {load && (
                <img src={LoadIcon} alt="Loading..." className="loading__profile"/>
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

export default Saved;