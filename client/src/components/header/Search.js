import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDataAPI} from "../../utils/fetchData";
import {GLOBALTYPES} from "../../redux/actions/globalTypes";
import {useHistory} from "react-router-dom";

const Search = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!search) return;

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token);
            setUsers(res.data.users);
            await history.push({
                pathname: '/search',
                state: { users: users }
            });
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
            <img className="search-icon" src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626912691/icon/search_trw2ne.svg" alt="message"/>
            <input
                type="text"
                className="search-bar"
                placeholder="Nhấn enter để tìm kiếm"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value.toLowerCase().replace(/ /g, " "))
                }
            />
            <img className="search-icon--close" onClick={handleClose} src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626912787/icon/error_l9krog.svg" alt="message" style={search?{visibility: "visible"}:{visibility:"hidden"}}/>
        </form>
    );
}

export default Search;