import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";

const SearchPage = ({}) => {
    const location = useLocation();
    const users = location.state.users;

    return (
        <div className="search-page">
            <span>Kết quả tìm kiếm</span>
            {
                users ? users.map( user => (<span>{user.username}</span>))
                      : <span>Không tìm thấy</span>
            }
        </div>
    );
}

export default SearchPage;