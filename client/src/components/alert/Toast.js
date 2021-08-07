import React from 'react'

const Toast = ({msg, handleShow, type}) => {
    const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle",
        close: "fas fa-times",
    };

    return (
        <div className={`toast toast--${type}`} id="toast">
            <div className="toast__icon">
                <i className={icons[type]}/>
            </div>
            <div className="toast__body">
                <h3 className="toast__title">{msg.title}</h3>
                <p className="toast__msg">{msg.body}</p>
            </div>
            <div className="toast__close" onClick={handleShow} onclose={setTimeout(handleShow, 5000)}>
                <i className={icons["close"]}/>
            </div>
        </div>
    );
};

export default Toast