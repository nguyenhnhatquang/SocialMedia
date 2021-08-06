import React from 'react';
import {useSelector} from "react-redux";
import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import RightSide from "../components/sidebar/RightSide";

const LoadIcon = 'https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626030734/Spinner-0.4s-257px_v8vrp7.gif'

const Home = () => {
    const {homePosts} = useSelector(state => state);
    return (
        <div className="home">
            <div className="home-body">
                <Status/>
                {homePosts.loading ? (
                    <img src={LoadIcon} alt="loading" style={{marginTop: "20px", marginLeft: "25%"}}/>
                ) : (homePosts.result === 0 ? <h2 className="text-center">Không có bài viết</h2> : <Posts />
                )}
            </div>
            <div className="home-right">
                <RightSide />
            </div>
        </div>
    );
}

export default Home;