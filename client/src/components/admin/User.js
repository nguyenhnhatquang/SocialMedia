import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDataAPI} from "../../utils/fetchData";
import {GLOBALTYPES} from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import {updateStatusUser} from "../../redux/actions/adminAction";

const User = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const {auth} = useSelector((state) => state);
    const [check, setCheck] = useState(false);
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!search) return;

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token);
            setUsers(res.data.users);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg},
            });
        }
    };

    const handleClose = () => {
        setSearch("");
        setUsers([]);
    };

    const handleBlockUser = (user) => {
        if (window.confirm("Bạn có thực sự muốn thực hiện hành động này?")) {
            const status = !user.status;
            const id = user._id;
            dispatch(updateStatusUser({status, id, auth}));
            return true;
        }
        return false;
    };

    return (
        <div className="admin--right">
            <div className="admin--user_header">
                <label><strong>Quản lý User</strong></label>
                {/*<button className="btn admin--add_btn">Thêm mới</button>*/}
                <form onSubmit={handleSearch} className="admin--search_form">
                    <input type="text"
                           className="admin--user_header-search"
                           placeholder="Tìm kiếm users ..."
                           value={search}
                           onChange={(e) =>
                               setSearch(e.target.value.toLowerCase().replace(/ /g, " "))
                           }
                    />
                    <img className="search--close" onClick={handleClose}
                         src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626912787/icon/error_l9krog.svg"
                         alt="message" style={search ? {visibility: "visible"} : {visibility: "hidden"}}/>
                </form>
            </div>

            <div className="admin--search">
                {
                    users.map(user =>
                        (
                            <div className={user.status ? "user-card" : "user-card block"} key={user._id}
                                 style={{cursor: "default"}}>
                                <div className="user-card_avatar">
                                    <Avatar src={user.avatar} size="medium-avatar"/>
                                </div>
                                <div className="user-card_information">
                                    <span className="user-card_information-fullName">{user.fullName}</span>
                                    <span className="user-card_information-username">@{user.username}</span>
                                </div>
                                <div className="user-card_status">
                                    <span>{user.role === "user" ? "User" : "Admin"}</span>
                                </div>
                                <button className={user.status ? "user-card_button" : "user-card_button active"}
                                        onClick={(e) => {
                                            if(handleBlockUser(user)){
                                                if (e.target.className === "user-card_button active"){
                                                    e.target.className = "user-card_button"
                                                    e.target.innerText = "Khóa"
                                                    e.target.parentElement.className = "user-card";
                                                } else {
                                                    e.target.className = "user-card_button active"
                                                    e.target.innerText = "Mở"
                                                    e.target.parentElement.className = "user-card block";
                                                }
                                            }

                                        }}>{user.status ? "Khóa" : "Mở"}</button>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default User;