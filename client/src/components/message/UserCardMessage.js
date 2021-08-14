import React from 'react'
import Avatar from '../Avatar'
import {Link} from 'react-router-dom'

const UserCardMessage = ({children, user}) => {
    return (
        <div className="user-card">
            <div className="user-card_avatar-message">
                <Avatar src={user.avatar} size="medium-avatar"/>
            </div>
            <Link className="user-card_information-message">
                <span className="user-card_information-fullName">{user.fullName}</span>
                <span className="user-card_information-username">@{user.username}</span>
            </Link>
            {children}
        </div>
    )
}

export default UserCardMessage
