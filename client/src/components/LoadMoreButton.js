import React from 'react'

const LoadMoreButton = ({ result, page, load, handleLoadMore }) => {
    return (
        <>
            {result < 9 * (page - 1)
                ? ""
                : !load && (
                <button
                    className="loadMoreButton"
                    onClick={handleLoadMore}
                >
                    Xem thêm
                </button>
            )}
        </>
    );
};

export default LoadMoreButton