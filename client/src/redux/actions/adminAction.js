import {GLOBALTYPES} from "./globalTypes";
import {getDataAPI, deleteDataAPI, patchDataAPI} from "../../utils/fetchData";
import {createNotify} from "./notifyAction";

export const ADMIN_TYPES = {
    GET_TOTAL_USERS: "GET_TOTAL_USERS",
    GET_TOTAL_POSTS: "GET_TOTAL_POSTS",
    GET_TOTAL_COMMENTS: "GET_TOTAL_COMMENTS",
    GET_TOTAL_LIKES: "GET_TOTAL_LIKES",
    GET_TOTAL_SPAM_POSTS: "GET_TOTAL_SPAM_POSTS",
    GET_TOTAL_ACTIVE_USERS: "GET_TOTAL_ACTIVE_USERS",
    GET_SPAM_POSTS: "GET_SPAM_POSTS",
    LOADING_ADMIN: "LOADING_ADMIN",
    DELETE_POST: "DELETE_POST",
    CANCEL_POST: "CANCEL_POST",
    UPDATE_STATUS_USER: "UPDATE_STATUS_USER",
};


export const getTotalUsers = (token) => async (dispatch) => {
    try {
        dispatch({type: ADMIN_TYPES.LOADING_ADMIN, payload: true});
        const res = await getDataAPI("get_total_users", token);
        dispatch({type: ADMIN_TYPES.GET_TOTAL_USERS, payload: res.data});

        dispatch({type: ADMIN_TYPES.LOADING_ADMIN, payload: false});
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg,
            },
        });
    }
};


export const getTotalPosts = (token) => async (dispatch) => {
    try {
        dispatch({type: ADMIN_TYPES.LOADING_ADMIN, payload: true});
        const res = await getDataAPI("get_total_posts", token);
        dispatch({type: ADMIN_TYPES.GET_TOTAL_POSTS, payload: res.data});

        dispatch({type: ADMIN_TYPES.LOADING_ADMIN, payload: false});
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg,
            },
        });
    }
};


export const getTotalComments = (token) => async (dispatch) => {
    try {
        dispatch({type: ADMIN_TYPES.LOADING_ADMIN, payload: true});
        const res = await getDataAPI("get_total_comments", token);
        dispatch({type: ADMIN_TYPES.GET_TOTAL_COMMENTS, payload: res.data});

        dispatch({type: ADMIN_TYPES.LOADING_ADMIN, payload: false});
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg,
            },
        });
    }
};


export const getTotalLikes = (token) => async (dispatch) => {
    try {
        dispatch({type: ADMIN_TYPES.LOADING_ADMIN, payload: true});
        const res = await getDataAPI("get_total_likes", token);
        dispatch({type: ADMIN_TYPES.GET_TOTAL_LIKES, payload: res.data});

        dispatch({type: ADMIN_TYPES.LOADING_ADMIN, payload: false});
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg,
            },
        });
    }
};

export const getTotalSpamPosts = (token) => async (dispatch) => {
    try {
        dispatch({type: ADMIN_TYPES.LOADING_ADMIN, payload: true});
        const res = await getDataAPI("get_total_spam_posts", token);
        dispatch({type: ADMIN_TYPES.GET_TOTAL_SPAM_POSTS, payload: res.data});

        dispatch({type: ADMIN_TYPES.LOADING_ADMIN, payload: false});
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg,
            },
        });
    }
};

export const getSpamPosts = (token) => async (dispatch) => {
    try {
        dispatch({type: ADMIN_TYPES.LOADING_ADMIN, payload: true});
        const res = await getDataAPI("get_spam_posts", token);

        // Sắp xếp theo số lượng người report giảm dần
        const lstSortReports = res.data.spamPosts.sort((a, b) => Number(b.reports.length) - Number(a.reports.length));

        dispatch({type: ADMIN_TYPES.GET_SPAM_POSTS, payload: lstSortReports});

        dispatch({type: ADMIN_TYPES.LOADING_ADMIN, payload: false});
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg,
            },
        });
    }
};

export const deleteSpamPost = ({post, auth, socket}) => async (dispatch) => {
    dispatch({type: ADMIN_TYPES.DELETE_POST, payload: post});

    try {
        const res = await deleteDataAPI(
            `delete_spam_posts/${post._id}`,
            auth.token
        );

        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}});

        const msg = {
            id: auth.user._id,
            text: "Bài viết của bạn bị xoá do vi phạm quy định của chúng tôi",
            recipients: [post.user._id],
            url: `/profile/${post.user._id}`,
        };

        dispatch(createNotify({msg, auth, socket}));
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg,
            },
        });
    }
};

export const cancelSpamPost = ({post, auth}) => async (dispatch) => {
    dispatch({type: ADMIN_TYPES.CANCEL_POST, payload: post});

    try {
        const res = await deleteDataAPI(
            `cancel_spam_posts/${post._id}`,
            auth.token
        );

        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}});

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg,
            },
        });
    }
};

export const getTotalActiveUsers = ({auth, socket}) => async (dispatch) => {
    try {
        socket.emit('getActiveUsers', auth.user._id);
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg,
            },
        });
    }
};

export const updateStatusUser = ({status,id, auth}) => async (dispatch) => {
    try {
        const res = await patchDataAPI("admin_user", {
            status, id
        }, auth.token);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {success: res.data.msg},
        });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg,
            },
        });
    }
};