import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Avatar from './Avatar'
import moment from 'moment'
import {isReadNotify, NOTIFY_TYPES, deleteAllNotifies} from '../redux/actions/notifyAction'

const NotifyModal = () => {
    const {auth, notify} = useSelector(state => state)
    const dispatch = useDispatch()

    const handleIsRead = (msg) => {
        dispatch(isReadNotify({msg, auth}))
    }

    const handleSound = () => {
        dispatch({type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound})
    }

    const handleDeleteAll = () => {
        const newArr = notify.data.filter(item => item.isRead === false)
        if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

        if (window.confirm(`Bạn có ${newArr.length} thông báo chưa đọc. Bạn thật sự muốn xoá tất cả?`)) {
            return dispatch(deleteAllNotifies(auth.token))
        }
    }

    return (
        <div className="notify">
            <div className="notify__header">
                <h2>Thông báo</h2>
                {
                    notify.sound
                        ? <i className="fas fa-bell"
                             style={{fontSize: '1.2rem', cursor: 'pointer'}}
                             onClick={handleSound}/>

                        : <i className="fas fa-bell-slash"
                             style={{fontSize: '1.2rem', cursor: 'pointer'}}
                             onClick={handleSound}/>
                }
            </div>

            {
                notify.data.length === 0 && <h4 className="notify--no-notify">Không có thông báo</h4>
            }

            <div className="notify__body">
                {
                    notify.data.map((msg, index) => (
                        <div key={index} className="notify__content">
                            <Link to={`${msg.url}`} className="notify__info"
                                  onClick={() => handleIsRead(msg)}>
                                <Avatar src={msg.user.avatar} size="big-avatar"/>

                                <div className="notify__text">
                                    <strong>{msg.user.username}</strong>
                                    <span> {msg.text}</span>
                                </div>
                            </Link>

                            <small className="notify__date">
                                <span>{moment(msg.createdAt).fromNow()}</span>
                                {
                                    !msg.isRead && <i className="fas fa-circle"/>
                                }
                            </small>
                        </div>
                    ))
                }

            </div>

            <div className="notify__footer" onClick={handleDeleteAll}>
                Xoá tất cả
            </div>
        </div>
    )
}

export default NotifyModal