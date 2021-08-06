import React from 'react'

const LikeButton = ({className, isLike, handleLike, handleUnLike}) => {
    return (
        <>
            {
                isLike
                    ? <img
                        className={className}
                        src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627476034/icon/heart_full_jgml7q.svg"
                        alt="heart"
                        onClick={handleUnLike}
                    />
                    : <img
                        className={className}
                        src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627476001/icon/heart_dnjyql.svg"
                        alt="heart"
                        onClick={handleLike}
                    />
            }
        </>
    )
}

export default LikeButton
