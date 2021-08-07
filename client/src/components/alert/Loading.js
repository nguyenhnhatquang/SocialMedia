import React from "react";

const Loading = () => {
    return (
        <div id="loading">
            <div className="loader">
                <div className="loader__inner one"></div>
                <div className="loader__inner two"></div>
                <div className="loader__inner three"></div>
            </div>
        </div>
    );
}

export default Loading;