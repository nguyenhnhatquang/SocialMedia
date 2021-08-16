import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import UserCard from "../components/UserCard";

const LoadIcon = 'https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1628335180/Spinner-0.5s-200px_s19crb.gif'

const Friends = () => {
    const {auth} = useSelector(state => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    return (
        <div className="friends">
            <div className="friends-component">
                <span className="friends-title">Bạn bè của bạn</span>
                <div className="friends-users">
                    {auth.user.friends.length > 0 ?
                        (auth.user.friends.map((user) =>
                            <UserCard user={user}/>
                        ))
                        : <span className="friends-nothing">Không có</span>}
                </div>
            </div>
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