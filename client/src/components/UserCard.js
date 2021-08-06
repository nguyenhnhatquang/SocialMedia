import React from 'react'
import Avatar from './Avatar'
import {Link} from 'react-router-dom'

const UserCard = ({children, user}) => {
    return (
        <div className="user-card">
            <div className="user-card_avatar">
                <Avatar src={user.avatar} size="medium-avatar"/>
            </div>
            <Link to={`/profile/${user._id}`} className="user-card_information">
                <span className="user-card_information-fullName">{user.fullName}</span>
                <span className="user-card_information-username">@{user.username}</span>
            </Link>
            {children}
        </div>
    )
}

export default UserCard
