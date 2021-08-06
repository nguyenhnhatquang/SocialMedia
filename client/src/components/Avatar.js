import React from "react"

const Avatar = ({src, size}) => {
    return (
        <img
            src={src}
            alt="Avatar"
            className={size}
        />
    );
}

export default Avatar;