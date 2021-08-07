import React from "react";

const IconHeader = ({type, notify}) => {
    const icons = {
        message: "fas fa-comment",
        sortDown: "fas fa-sort-down",
        notification: "fas fa-bell",
        home: "fas fa-home",
        compass: "fas fa-compass",
        key: "fas fa-key",
        logout: "fas fa-sign-out-alt",
        people: "fas fa-user-friends",
    };

    return (
        <div className="header__icon">
            <i className={icons[type]}/>
            {notify && (
                <div className="header__icon-notify">
                    <span>{notify.data.length}</span>
                </div>
            )}
        </div>
    );
}

export default IconHeader;