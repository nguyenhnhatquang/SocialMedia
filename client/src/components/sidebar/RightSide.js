import React from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {getSuggestions} from "../../redux/actions/suggestionsAction";
import UserCard from "../UserCard";

const LoadIcon = 'https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1628335180/Spinner-0.5s-200px_s19crb.gif'

const RightSideBar = () => {
    const {auth, suggestions} = useSelector(state => state)
    const dispatch = useDispatch()

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

            {suggestions.users.length != 0 &&
                <div className="right-side_suggestion">
                    <span className="right-side_suggestion_title">Đề xuất</span>
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
