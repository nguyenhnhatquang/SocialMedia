import React, {useState} from 'react'
import Carousel from "../../Carousel";

const CardBody = ({post, theme}) => {
    const [readMore, setReadMore] = useState(false)

    return (
        <div className="card-body">
            <div
                className="card-body_content"
                style={{
                    filter: theme ? "invert(1)" : "invert(0)",
                    color: theme ? "white" : "#111",
                }}
            >
                <p className="card-body_content-text">
                    {post.content.length < 60
                        ? post.content
                        : readMore
                            ? post.content + " "
                            : post.content.slice(0, 55) + "... "}
                    {post.content.length > 60 && (
                        <span
                            className="card-body_content-textMore"
                            onClick={() => setReadMore(!readMore)}
                        >
              {readMore ? "Ẩn" : "Xem thêm"}
            </span>
                    )}
                </p>
            </div>

            <div className="images">
                {post.images.length > 0 && (
                    <Carousel images={post.images} id={post._id}/>
                )}
            </div>
        </div>
    );
}

export default CardBody;
