import React from "react";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

const Conversation = () => {
    return (
        <div className="message">
            <div className="message-left">
                <LeftSide/>
            </div>

            <div className="message-right">
                <RightSide/>
            </div>
        </div>
    );
};

export default Conversation;