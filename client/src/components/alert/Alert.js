import React from "react";
import {useSelector, useDispatch} from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";
import {GLOBALTYPES} from "../../redux/actions/globalTypes";

const Alert = () => {
    const {alert} = useSelector((state) => state);
    const dispatch = useDispatch();
    return (
        <>
            {alert.loading && <Loading/>}

            {alert.error && (
                <Toast
                    msg={{title: "Thất bại", body: alert.error}}
                    handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})}
                    type="error"
                />
            )}

            {alert.success && (
                <Toast
                    msg={{title: "Thành công", body: alert.success}}
                    handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})}
                    type="success"
                />
            )}
        </>
    );
};

export default Alert;