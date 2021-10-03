import React from 'react';
import UserCard from "../components/UserCard";
import {useSelector} from "react-redux";


const Friends = () => {
    const {auth} = useSelector(state => state);

    return (
        <div className="friends">
            <div className="friends-component">
                <span className="friends-title">Người bạn đã theo dõi</span>
                <div className="friends-users">
                    {auth.user.following.length > 0 ?
                        (auth.user.following.map((user) =>
                            <UserCard user={user}/>
                        ))
                        : <span className="friends-nothing">Không có</span>}
                </div>
            </div>
            <div className="friends-component">
                <span className="friends-title">Người đã theo dõi bạn</span>
                <div className="friends-users">
                    {auth.user.followers.length > 0 ?
                        (auth.user.followers.map((user) =>
                            <UserCard user={user}/>
                        ))
                        : <span className="friends-nothing">Không có</span>}
                </div>
            </div>
        </div>
    );
}

export default Friends;