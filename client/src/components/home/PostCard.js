import React from 'react';
import CardHeader from "./post-card/CardHeader";
import CardBody from "./post-card/CardBody";
import CardFooter from "./post-card/CardFooter";
import Comments from "./comment";
import InputComment from "./InputComment";

const PostCard = ({ post, theme }) => {
    return (
        <div className="post-card">
            <CardHeader post={post} />
            <CardBody post={post} theme={theme} />
            <CardFooter post={post} />

            <Comments post={post} />
            <InputComment post={post} />
        </div>
    );
};

export default PostCard