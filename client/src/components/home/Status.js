import React from 'react'
import Avatar from '../Avatar';
import {useSelector, useDispatch} from "react-redux";
import {GLOBALTYPES} from '../../redux/actions/globalTypes'

const Status = () => {
    const {auth} = useSelector(state => state);
    const dispatch = useDispatch();
    return (
        <div className="home-status">
            <Avatar src={auth.user.avatar} size="big-avatar"/>
            <button
                className="home-status_button"
                onClick={() => {
                    dispatch({type: GLOBALTYPES.STATUS, payload: true});
                }}>
                Bạn đang nghĩ gì thế?
            </button>
        </div>
    );
}

export default Status