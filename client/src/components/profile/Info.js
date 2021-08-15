import React, {useState, useEffect} from 'react';
import Avatar from '../Avatar';
import Following from './Following';
import Followers from './Followers';
import {GLOBALTYPES} from '../../redux/actions/globalTypes';
import FollowButton from "../FollowButton";

const Info = ({id, auth, profile, dispatch}) => {
    const [userData, setUserData] = useState([]);

    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user]);
        } else {
            const newData = profile.users.filter(user => user._id === id);
            setUserData(newData);
        }
    }, [id, auth, dispatch, profile.users]);

    useEffect(() => {
        if (showFollowers || showFollowing ) {
            dispatch({type: GLOBALTYPES.MODAL, payload: true});
        } else {
            dispatch({type: GLOBALTYPES.MODAL, payload: false});
        }
    }, [showFollowers, showFollowing, dispatch]);

    return (
        <div className="info">
            {userData.map((user) => (
                <div key={user._id} className="info-container">
                    <Avatar src={user.avatar} size="supper-avatar"/>

                    <div className="info-content">
                        <span className="info-content_username">{user.username}</span>
                        <div className="info-content_buttons">
                            {user._id === auth.user._id ? (
                                <button className="info-content_button"
                                    onClick={() => dispatch({type: GLOBALTYPES.EDIT_PROFILE, payload: true})}
                                >
                                    Chỉnh sửa trang cá nhân
                                </button>
                            ) : (
                                <FollowButton user={user}/>
                            )}
                        </div>
                        <div className="info-content_follows">
                            <span className="info-content_follow" onClick={() => setShowFollowers(true)}>
                              {user.followers.length} người theo dõi
                            </span>
                            <span className="info-content_follow" onClick={() => setShowFollowing(true)}>
                              Đã theo dõi {user.following.length} người
                            </span>
                        </div>

                        <span className="info-content_name">{user.fullName}</span>
                        <span className="info-content_email">{user.email}</span>
                        <span className="info-content_website">{user.website}</span>
                        <p className="info-content_story">"{user.story}"</p>
                    </div>

                    {showFollowers && (
                        <Followers
                            users={user.followers}
                            setShowFollowers={setShowFollowers}
                        />
                    )}

                    {showFollowing && (
                        <Following
                            users={user.following}
                            setShowFollowing={setShowFollowing}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Info