import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {GLOBALTYPES} from "../../redux/actions/globalTypes";
import {getConversations, MESS_TYPES} from "../../redux/actions/messageAction";
import {getDataAPI} from "../../utils/fetchData";
import UserCardMessage from "./UserCardMessage";

const LeftSide = () => {
    const {auth, message, online} = useSelector((state) => state);
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [searchUsers, setSearchUsers] = useState([]);

    const history = useHistory();
    const {id} = useParams();

    const pageEnd = useRef();
    const [page, setPage] = useState(0);

    const handleSearch = async e => {
        e.preventDefault()
        if (!search) return setSearchUsers([]);

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setSearchUsers(res.data.users)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
            })
        }
    }

    const handleAddUser = (user) => {
        setSearch('')
        setSearchUsers([])
        dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text: '', media: []}})
        dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        return history.push(`/message/${user._id}`)
    }

    const isActive = (user) => {
        if (id === user._id) return "active";
        return "";
    };

    useEffect(() => {
        if (message.firstLoad) return;
        dispatch(getConversations({auth}));
    }, [dispatch, auth, message.firstLoad]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((p) => p + 1);
                }
            },
            {
                threshold: 0.1,
            }
        );
        observer.observe(pageEnd.current);
    }, [setPage]);

    useEffect(() => {
        if (message.resultUsers >= (page - 1) * 9 && page > 1) {
            dispatch(getConversations({auth, page}));
        }
    }, [message.resultUsers, page, auth, dispatch]);


    useEffect(() => {
        if (message.firstLoad) {
            dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        }
    }, [online, message.firstLoad, dispatch])

    return (
        <>
            <form className="message-left_form" onSubmit={handleSearch}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm trên tin nhắn"
                />

                <button style={{display: "none"}} type="submit" id="search"/>
            </form>

            <div className="message-left_list">
                {searchUsers.length !== 0 ?
                    <>
                        {searchUsers.map((user) => (
                            <div
                                key={user._id}
                                className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}
                            >
                                <UserCardMessage user={user}/>
                            </div>
                        ))}
                    </> : <>
                        {message.users.map((user) => (
                            <div
                                key={user._id}
                                className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}
                            >
                                <UserCardMessage user={user}/>
                            </div>
                        ))}
                    </>
                }
                <button style={{opacity: 0}} ref={pageEnd}>
                    Xem thêm
                </button>
            </div>
        </>
    );
};

export default LeftSide;
