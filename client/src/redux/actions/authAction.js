import {postDataAPI} from "../../utils/fetchData";
import {GLOBALTYPES} from "./globalTypes";

export const TYPES = {
    AUTH: "AUTH",
};

export const login = (data) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
        const res = await postDataAPI("login", data);

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {token: res.data.access_token, user: res.data.user},
        });

        dispatch({
            type: GLOBALTYPES.USER_TYPE,
            payload: res.data.user.role,
        });

        localStorage.setItem("firstLogin", true);
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}});
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg},
        });
    }
};

export const changePassword = ({oldPassword, newPassword, cnfNewPassword, auth}) => async (dispatch) => {
    if (!oldPassword || oldPassword.length === 0) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: "Nhập mật khẩu cũ"},
        });
    }
    if (!newPassword || newPassword.length === 0) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: "Nhập mật khẩu mới"},
        });
    }
    if (!cnfNewPassword || cnfNewPassword.length === 0) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: "Nhập lại mật khẩu mới"},
        });
    }
    if (newPassword !== cnfNewPassword) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: "Nhập lại mật khẩu không trùng khớp"},
        });
    }

    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

        const res = await postDataAPI('changePassword', {oldPassword, newPassword}, auth.token);

        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}});
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}});
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg},
        });
    }
};

export const adminLogin = (data) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
        const res = await postDataAPI("admin_login", data);

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {token: res.data.access_token, user: res.data.user},
        });

        dispatch({
            type: GLOBALTYPES.USER_TYPE,
            payload: res.data.user.role,
        });

        localStorage.setItem("firstLogin", true);
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}});
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg},
        });
    }
};

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
        try {
            const res = await postDataAPI("refresh_token");
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {token: res.data.access_token, user: res.data.user},
            });

            dispatch({
                type: GLOBALTYPES.USER_TYPE,
                payload: res.data.user.role,
            });

            dispatch({type: GLOBALTYPES.ALERT, payload: {}});
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg},
            });
        }
    }
};

export const register = (data) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
        const res = await postDataAPI("register", data);

        localStorage.setItem("firstLogin", true);
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}});
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg},
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
        localStorage.removeItem("firstLogin");

        await postDataAPI("logout");
        window.location.href = "/";
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}});
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg},
        });
    }
};
