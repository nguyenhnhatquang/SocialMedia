import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDataAPI} from "../../utils/fetchData";
import {GLOBALTYPES} from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";

const LoadIcon = 'https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1628335180/Spinner-0.5s-200px_s19crb.gif'

const Search = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    const {auth} = useSelector((state) => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!search) return;

        try {
            setLoad(true)
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setUsers(res.data.users)
            setLoad(false)
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

    return (
        <form className="search" onSubmit={handleSearch}>
            <img className="search__icon"
                 src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626912691/icon/search_trw2ne.svg"
                 alt="message"/>

            <input
                type="text"
                className="search__bar"
                placeholder="Nhấn enter để tìm kiếm"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value.toLowerCase().replace(/ /g, " "))
                }
            />

            <img className="search--close" onClick={handleClose}
                 src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626912787/icon/error_l9krog.svg"
                 alt="message" style={search ? {visibility: "visible"} : {visibility: "hidden"}}/>
            <button type="submit" style={{display: 'none'}}>Search</button>

            { load && <img className="loading" src={LoadIcon} alt="loading"  /> }

            <div className="users">
                {
                    search && users.map(user => (
                        <UserCard
                            key={user._id}
                            user={user}
                        />
                    ))
                }
            </div>
        </form>
    );
}

export default Search;