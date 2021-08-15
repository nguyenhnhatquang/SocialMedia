import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {GLOBALTYPES} from "../redux/actions/globalTypes";

import {updateProfileUser} from "../redux/actions/profileAction";


const EditProfileModal = () => {
    const initialState = {
        fullName: "",
        mobile: "",
        address: "",
        website: "",
        story: "",
        gender: "",
    };
    const [userData, setUserData] = useState(initialState);
    const {fullName, website, story} = userData;
    const {auth} = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        setUserData(auth.user);
    }, [auth.user]);

    const handleInput = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateProfileUser({userData, auth}));
    };

    return (
        <div className="edit-profile">
            <form className="edit-profile_form" onSubmit={handleSubmit}>
                <div className="edit-profile_header">
                    <span className="edit-profile_header-title">Chỉnh sửa trang cá nhân</span>
                    <img
                        className="search--close"
                        src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626912787/icon/error_l9krog.svg"
                        alt="message"
                        onClick={() => {
                            dispatch({
                                type: GLOBALTYPES.EDIT_PROFILE,
                                payload: false,
                            });
                        }}
                    />
                </div>

                <div className="edit-profile_body">
                    <div className="edit-profile_body-fullName">
                        <label className="edit-profile_body-label" htmlFor="fullName">Tên của bạn</label>
                        <input
                            type="text"
                            className="edit-profile_body-input"
                            id="fullName"
                            name="fullName"
                            value={fullName}
                            placeholder="Tên của bạn"
                            onChange={handleInput}
                        />
                        {
                            fullName.length <= 25 ?
                                <small className="edit-profile_body-countName">
                                    {fullName.length}/25
                                </small> :
                                <small className="edit-profile_body-countName" style={{color: "red"}}>
                                    {fullName.length}/25
                                </small>
                        }
                    </div>
                    <div className="edit-profile_body-fullName">
                        <label className="edit-profile_body-label" htmlFor="fullName">Website</label>
                        <input
                            type="text"
                            className="edit-profile_body-input"
                            id="website"
                            name="website"
                            value={website}
                            placeholder="Website"
                            onChange={handleInput}
                        />
                    </div>
                    <div className="edit-profile_body-fullName">
                        <label className="edit-profile_body-label" htmlFor="fullName">Story</label>
                        <textarea
                            cols="30"
                            rows="4"
                            type="text"
                            className="edit-profile_body-input"
                            id="story"
                            name="story"
                            value={story}
                            onChange={handleInput}
                        />

                        {
                            story.length <= 200 ?
                                <small className="edit-profile_body-countName">
                                    {story.length}/200
                                </small> :
                                <small className="edit-profile_body-countName" style={{color: "red"}}>
                                    {story.length}/200
                                </small>
                        }
                    </div>
                </div>

                <div className="edit-profile_body-gender">
                    <label className="edit-profile_body-label" htmlFor="gender">Giới tính</label>
                    <div className="edit-profile_body-radioButton">
                        <input type="radio" id="editProfileMale"
                               name="gender" value="male" onChange={handleInput}
                               checked={userData.gender === "male" ? true : false}
                        />
                        <label htmlFor="editProfileMale">Nam</label>

                        <input type="radio" id="editProfileFemale"
                               name="gender" value="female" onChange={handleInput}
                               checked={userData.gender === "female" ? true : false}/>
                        <label htmlFor="editProfileFemale">Nữ</label>

                        <input type="radio" id="editProfileOther"
                               name="gender" value="other" onChange={handleInput}
                               checked={userData.gender === "other" ? true : false}/>
                        <label htmlFor="editProfileOther">Khác</label>
                    </div>
                </div>

                <button className="edit-profile_submit" type="submit">
                    Cập nhật
                </button>
            </form>
        </div>
    );
};

export default EditProfileModal;