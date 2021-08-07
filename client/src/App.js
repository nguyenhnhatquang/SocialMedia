import {BrowserRouter as Router, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import io from 'socket.io-client'

import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Home from "./pages/home";
import Auth from "./pages/auth";

import Alert from "./components/alert/Alert";
import {refreshToken} from "./redux/actions/authAction";
import {GLOBALTYPES} from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";
import AdminDashboard from "./pages/admin";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";
import {getPosts} from "./redux/actions/postAction";
import {getNotifies} from "./redux/actions/notifyAction";
import {getSuggestions} from "./redux/actions/suggestionsAction";
import moment from "moment";
import 'moment/locale/vi';
import LeftSide from "./components/sidebar/LeftSide";
import ChangePasswordModal from "./components/ChangePasswordModal";
import EditProfileModal from "./components/EditProfileModal";

function App() {
    const {auth, status, modal, userType, changePassword, editProfile} = useSelector((state) => state);

    const dispatch = useDispatch();

    // Custom moment.js Vietnamese
    useEffect(() => {
        moment.locale('vi');
        moment.updateLocale('vi', {
            longDateFormat: {
                LLLL: " LT dddd, Do/MM/YYYY",
            },
            weekdays: ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"]
        });
    });

    useEffect(() => {
        dispatch(refreshToken());

        const socket = io();
        dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
        return () => socket.close()
    }, [dispatch]);

    useEffect(() => {
        if (auth.token) {
            dispatch(getPosts(auth.token));
            dispatch(getSuggestions(auth.token));
            dispatch(getNotifies(auth.token));
        }
    }, [dispatch, auth.token]);

    return (
        <Router>
            <Alert/>
            {auth.token && <SocketClient/>}

            <input type="checkbox" id="theme"/>
            <div className="App">
                <div className="main">
                    {status && <StatusModal/>}
                    {changePassword && <ChangePasswordModal/>}
                    {editProfile && <EditProfileModal/>}

                    {auth.token && <Header/>}
                    {auth.token && <LeftSide/>}

                    <Route
                        exact
                        path="/"
                        component={auth.token ? Home : Auth}
                    />

                    {auth.token && (
                        <>
                            <PrivateRouter exact path="/:page" component={PageRender}/>
                            <PrivateRouter exact path="/:page/:id" component={PageRender}/>
                        </>
                    )}
                </div>
            </div>
        </Router>
    );
}

export default App;
