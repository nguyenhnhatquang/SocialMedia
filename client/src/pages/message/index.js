import React from 'react'
import LeftSide from "../../components/message/LeftSide";

const Message = () => {
    return (
        <div className="message">
            <div className="spaceRight"/>
            <div className="messageBody">
                <div className="message-left">
                    <LeftSide/>
                </div>

                <div className="message-right"/>
            </div>
        </div>
    );
}

export default Message