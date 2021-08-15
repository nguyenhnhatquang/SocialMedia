import React from "react";
import UserCard from "../UserCard";
import {useSelector} from "react-redux";
import FollowButton from "../FollowButton";

const Followers = ({users, setShowFollowers}) => {
    const {auth} = useSelector((state) => state);
    return (
        <div className="follow">
            <div className="follow_box">
                <h4 className="text-center follow_box-heading">Được theo dõi</h4>
                <hr/>
                {users.map((user) => (
                    <UserCard
                        key={user._id}
                        setShowFollowers={setShowFollowers}
                        user={user}
                    >
                        {auth.user._id !== user._id && <FollowButton user={user}/>}
                    </UserCard>
                ))}

                <img
                    className="follow-close"
                    src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626912787/icon/error_l9krog.svg"
                    alt="message"
                    onClick={() => setShowFollowers(false)}
                />
            </div>
        </div>
    );
};

export default Followers;