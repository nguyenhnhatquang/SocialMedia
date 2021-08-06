import React from "react";
import UserCard from "../UserCard";
import { useSelector } from "react-redux";
import FollowButton from "../FollowButton";

const Following = ({ users, setShowFollowing }) => {
    const { auth } = useSelector((state) => state);
    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center follow_box-heading">Đã theo dõi</h5>
                <hr />
                {users.map((user) => (
                    <UserCard
                        key={user._id}
                        setShowFollowing={setShowFollowing}
                        user={user}
                    >
                        {auth.user._id !== user._id && <FollowButton user={user} />}
                    </UserCard>
                ))}

                <div className="follow-close" onClick={() => setShowFollowing(false)}>
                    <img
                        className="search-icon--close"
                        src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626912787/icon/error_l9krog.svg"
                        alt="message"
                    />
                </div>
            </div>
        </div>
    );
};

export default Following;