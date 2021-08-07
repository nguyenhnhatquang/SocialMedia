import React, {useEffect, useState, useRef} from 'react';
import UserCard from "../UserCard";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import MsgDisplay from './MsgDisplay';
import {GLOBALTYPES} from '../../redux/actions/globalTypes';
import {imageShow, videoShow} from '../../utils/mediaShow';
import {imageUpload} from '../../utils/imageUpload';
import {
    addMessage,
    deleteConversation,
    getMessages,
    loadMoreMessages,
    MESSAGE_TYPES
} from '../../redux/actions/messageAction';

const LoadIcon = 'https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1628335180/Spinner-0.5s-200px_s19crb.gif'

const RightSide = () => {
    const {auth, message, theme, socket} = useSelector(state => state);
    const dispatch = useDispatch();

    const {id} = useParams();
    const [user, setUser] = useState([]);
    const [text, setText] = useState('');

    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);

    const [media, setMedia] = useState([]);
    const [loadMedia, setLoadMedia] = useState(false);

    const refDisplay = useRef();
    const pageEnd = useRef();

    const history = useHistory()

    useEffect(() => {
        const newData = message.data.filter(
            (item) => item.sender === auth.user._id || item.sender === id
        );
        setData(newData);
    }, [message.data, auth.user._id, id]);

    useEffect(() => {
        const newUser = message.users.find((user) => user._id === id);
        if (newUser) {
            setUser(newUser);
        }
    }, [message.users, id]);

    // Gởi Tin nhắn ảnh
    const handleChangeMedia = (e) => {
        const files = [...e.target.files];
        let err = "";
        let newMedia = [];

        files.forEach((file) => {
            if (!file) {
                return (err = "File does not exist.");
            }
            if (file.size > 1024 * 1024 * 5) {
                return (err = "Image size must be less than 5 mb.");
            }
            return newMedia.push(file);
        });
        if (err) {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err}});
        }
        setMedia([...media, ...newMedia]);
    };

    const handleDeleteMedia = (index) => {
        const newArr = [...media];
        newArr.splice(index, 1);
        setMedia(newArr);
    };

    useEffect(() => {
        if (id) {
            const getMessagesData = async () => {
                dispatch({type: MESSAGE_TYPES.GET_MESSAGES, payload: {messages: []}});
                setPage(1);
                await dispatch(getMessages({auth, id}));
                setTimeout(() => {
                    refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
                },100)
            };


            getMessagesData();
        }
    }, [id, dispatch, auth]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!text.trim() && media.length === 0) return;
        setText('');
        setMedia([]);

        setLoadMedia(true);

        let newArr = [];
        if (media.length > 0) newArr = await imageUpload(media);

        const msg = {
            sender: auth.user._id,
            recipient: id,
            text,
            media: newArr,
            createdAt: new Date().toISOString()
        }
        setLoadMedia(false);

        await dispatch(addMessage({msg, auth, socket}));
        if (refDisplay.current) {
            refDisplay.current.scrollIntoView({
                behaviour: "smooth",
                block: "end",
            });
        }
    };

    // load more
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
        if (message.resultData >= (page - 1) * 9 && page > 1) {
            dispatch(getMessages({auth, id, page}));
        }
    }, [message.resultData, page, id, auth, dispatch]);

    useEffect(() => {
        if (refDisplay.current) {
            refDisplay.current.scrollIntoView({
                behaviour: "smooth",
                block: "end",
            });
        }
    }, [text])

    const handleDeleteConversation = () => {
        if (window.confirm('Bạn thật sự muốn xoá?')) {
            dispatch(deleteConversation({auth, id}))
            return history.push('/message')
        }
    }

    return (
        <>
            <div className="message-header">
                {user.length !== 0 && (
                    <UserCard user={user}>
                        <i className="fas fa-trash text-danger" onClick={handleDeleteConversation}/>
                    </UserCard>
                )}
            </div>

            <div className="message-body">
                <div className="message-body-chat" ref={refDisplay}>
                    <button style={{marginTop: '-25px', opacity: 0}} ref={pageEnd}>
                        Xem thêm
                    </button>

                    {data.map((msg, index) => (
                        <div key={index}>
                            {msg.sender !== auth.user._id && (
                                <div className="message-body-chat_other">
                                    <MsgDisplay user={user} msg={msg} type="other"/>
                                </div>
                            )}
                            {msg.sender === auth.user._id && (
                                <div className="message-body-chat_you">
                                    <MsgDisplay user={auth.user} msg={msg} type="you" data={data}/>
                                </div>
                            )}
                        </div>
                    ))}

                    {loadMedia && (
                        <div className="chat_row you_message">
                            <img src={LoadIcon} alt="Loading..."/>
                        </div>
                    )}
                </div>
            </div>

            <form className="message-footer" onSubmit={handleSubmit}>
                <div className="message-footer_upload">
                    <input
                        type="file"
                        id="fileUploadMessage"
                        multiple
                        accept="image/*,video/*"
                        style={{display: "none"}}
                        onChange={handleChangeMedia}
                    />
                    <label htmlFor="fileUploadMessage">
                        <img
                            src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627442469/icon/picture_sphbkd.svg"
                            alt="message"
                        />
                    </label>
                </div>
                <input
                    className="message-footer_input"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    type="submit"
                    className="message-footer_submit"
                    disabled={text || media.length > 0 ? false : true}
                >
                    <i className="far fa-paper-plane"/>
                </button>

                <div
                    className="message-footer_media"
                    style={{display: media.length > 0 ? "" : "none"}}
                >
                    {media.map((item, index) => (
                        <div key={index} className="message-footer_media-image">
                            {item.type.match(/video/i)
                                ? videoShow(URL.createObjectURL(item), theme)
                                : imageShow(URL.createObjectURL(item), theme)}
                            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
                        </div>
                    ))}
                </div>

            </form>
        </>
    );
}

export default RightSide