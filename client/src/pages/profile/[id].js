import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {getProfileUsers} from "../../redux/actions/profileAction";
import Info from "../../components/profile/Info";
import Saved from "../../components/profile/Saved";
import Posts from "../../components/profile/Posts";

const LoadIcon = 'https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1628335180/Spinner-0.5s-200px_s19crb.gif'

const Profile = () => {
    const { profile, auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const { id } = useParams();
    const [saveTab, setSaveTab] = useState(false);

    useEffect(() => {
        if(profile.ids.every(item => item !== id )){
            dispatch(getProfileUsers({ id, auth }));

        }
    }, [id, auth, dispatch, profile.ids]);

    return (
        <div className="profile">
            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

            {auth.user._id === id && (
                <div className="profile_tab">
                    <button
                        className={saveTab ? "" : "active"}
                        onClick={() => setSaveTab(false)}
                    >
                        Bài viết
                    </button>
                    <button
                        className={saveTab ? "active" : ""}
                        onClick={() => setSaveTab(true)}
                    >
                        Đã lưu
                    </button>
                </div>
            )}

            {profile.loading ? (
                <img className="loading__profile" src={LoadIcon} alt="Loading" />
            ) : (
                <>
                    {
                        saveTab
                            ? <Saved auth={auth} dispatch={dispatch}  />
                            : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                    }
                </>
            )}
        </div>
    );
}

export default Profile;