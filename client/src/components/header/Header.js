import React from "react";
import {Link} from "react-router-dom";
import {getPosts} from "../../redux/actions/postAction";
import {getSuggestions} from "../../redux/actions/suggestionsAction";
import {useDispatch, useSelector} from "react-redux";

import Search from "./Search";
import Items from "./Items";

const Header = () => {
    const {auth} = useSelector(state => state);
    const dispatch = useDispatch();

    const handleRefreshHome = () => {
        window.scrollTo({top: 0})
        dispatch(getPosts(auth.token));
        dispatch(getSuggestions(auth.token));
    };

    return (
        <div className="header">
            <Link to="/" className="header-logo" onClick={handleRefreshHome}>
                <img className="header-logo--img" alt="logo" src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626886904/logo_nwimwg.png" ></img>
                <span className="header-logo--name">Social Media</span>
            </Link>
            <div className="header-search">
                <Search />
            </div>
            <div className="header-items">
                <Items />
            </div>
        </div>
    );
}

export default Header;