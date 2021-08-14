import React from 'react';
import Avatar from '../Avatar';
import {imageShow, videoShow} from '../../utils/mediaShow';
import {deleteMessages} from "../../redux/actions/messageAction";
import {useDispatch, useSelector} from "react-redux";

const MsgDisplay = ({user, msg, type, data}) => {
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()

    const handleDeleteMessages = () => {
        if (!data) return;

        if (window.confirm('Bạn thật sự muốn xoá?')) {
            dispatch(deleteMessages({msg, data, auth}))
        }
    }

    return (
        <div className="msgDisplay">
            <div className={`message-msgDisplay_${type}`}>
                <div className={`message-msgDisplay_avatar`}>
                    <Avatar src={user.avatar} size="small-avatar"/>
                </div>
                <span>{user.username}</span>
            </div>

            <div className="message-msgDisplay_content">
                {msg.text && (
                    <div className={`message-msgDisplay_text-${type}`}>
                        {msg.text}
                    </div>
                )}

                {msg.media && msg.media.map((item, index) => (
                    <div key={index} style={{maxWidth: '380px', maxHeight: '380px'}}>
                        {item.url.match(/video/i)
                            ? videoShow(item.url)
                            : imageShow(item.url)}
                    </div>
                ))}

                {
                    user._id === auth.user._id &&
                    <div className="message-msgDisplay_trash">
                        <i className="fas fa-trash text-danger" onClick={handleDeleteMessages}/>
                    </div>
                }
            </div>

            <div className={`message-msgDisplay_date-${type}`}>
                {new Date(msg.createdAt).toLocaleString()}
            </div>
        </div>
    );
}

export default MsgDisplay