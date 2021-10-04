import React from 'react'

import {useSelector} from 'react-redux'
import UserCard from "../UserCard";

const RightSideBar = () => {
    const {auth, suggestions} = useSelector(state => state)

    return (
        <div className="right-side">
            <div className="right-side_friends">
                <span className="right-side_friends-title">Bạn bè của bạn</span>
                <div>
                    {
                        auth.user.friends.map(user => (<UserCard key={user._id} user={user}/>))
                    }
                    <UserCard key={auth.user._id} user={auth.user}/>
                </div>
            </div>

            {suggestions.users.length !== 0 &&
            <div className="right-side_suggestion">
                <span className="right-side_suggestion_title">Gợi ý cho bạn</span>
                <div>
                    {
                        suggestions.users.map(user => (<UserCard key={user._id} user={user}/>))
                    }
                </div>
            </div>
            }
        </div>
    )
}

export default RightSideBar
