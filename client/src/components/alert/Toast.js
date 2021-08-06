import React from 'react'

const Toast = ({msg, handleShow, bgColor}) => {
    return (
        <div className={`toast toast--${bgColor}`}>
            <div className="toast__icon"></div>
            <div className="toast__content">
                <p className="toast__type">{msg.title}</p>
                <p className="toast__message">{msg.body}</p>
            </div>
            <div className="toast__close" onClick={handleShow} onclose={setTimeout(handleShow, 3000)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.6 15.6">
                    <path
                        d="M8.9 7.8l6.5-6.5c0.3-0.3 0.3-0.8 0-1.1 -0.3-0.3-0.8-0.3-1.1 0L7.8 6.8 1.3 0.2c-0.3-0.3-0.8-0.3-1.1 0 -0.3 0.3-0.3 0.8 0 1.1l6.5 6.5L0.2 14.4c-0.3 0.3-0.3 0.8 0 1.1 0.1 0.1 0.3 0.2 0.5 0.2s0.4-0.1 0.5-0.2l6.5-6.5 6.5 6.5c0.1 0.1 0.3 0.2 0.5 0.2 0.2 0 0.4-0.1 0.5-0.2 0.3-0.3 0.3-0.8 0-1.1L8.9 7.8z"/>
                </svg>
            </div>
        </div>
    );
};

export default Toast