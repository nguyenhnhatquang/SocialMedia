import React, {useEffect, useState, useRef} from 'react';
import UserCard from "../UserCard";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import MsgDisplay from './MsgDisplay';
import {GLOBALTYPES} from '../../redux/actions/globalTypes';
import {imageShow, videoShow} from '../../utils/mediaShow';
import {imageUpload} from '../../utils/imageUpload';
import {
    addMessage, getMessages, loadMoreMessages, deleteConversation
} from '../../redux/actions/messageAction';

const LoadIcon = 'https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1628335180/Spinner-0.5s-200px_s19crb.gif'

const RightSide = () => {
    const {auth, message, theme, socket} = useSelector(state => state)
    const dispatch = useDispatch();

    const {id} = useParams()
    const [user, setUser] = useState([])
    const [text, setText] = useState('')

    const refDisplay = useRef()
    const pageEnd = useRef()

    const [media, setMedia] = useState([])
    const [loadMedia, setLoadMedia] = useState(false)

    const [data, setData] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(0)
    const [isLoadMore, setIsLoadMore] = useState(0)

    const history = useHistory()

    useEffect(() => {
        const newData = message.data.find(item => item._id === id)
        if (newData) {
            setData(newData.messages)
            setResult(newData.result)
            setPage(newData.page)
        }
    }, [message.data, id])

    useEffect(() => {
        if (id && message.users.length > 0) {
            setTimeout(() => {
                refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
            }, 50)

            const newUser = message.users.find(user => user._id === id)
            if (newUser) setUser(newUser)
        }
    }, [message.users, id])

    const handleChangeMedia = (e) => {
        const files = [...e.target.files]
        let err = ""
        let newMedia = []

        files.forEach(file => {
            if (!file) return err = "File không tồn tại"

            if (file.size > 1024 * 1024 * 5) {
                return err = "Ảnh/video lớn hơn 5mb!"
            }

            return newMedia.push(file)
        })

        if (err) dispatch({type: GLOBALTYPES.ALERT, payload: {error: err}})
        setMedia([...media, ...newMedia])
    }

    const handleDeleteMedia = (index) => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!text.trim() && media.length === 0) return;
        setText('')
        setMedia([])
        setLoadMedia(true)

        let newArr = [];
        if (media.length > 0) newArr = await imageUpload(media)

        const msg = {
            sender: auth.user._id,
            recipient: id,
            text,
            media: newArr,
            createdAt: new Date().toISOString()
        }

        setLoadMedia(false)
        await dispatch(addMessage({msg, auth, socket}))
        if (refDisplay.current) {
            refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
        }
    }

    useEffect(() => {
        const getMessagesData = async () => {
            if (message.data.every(item => item._id !== id)) {
                await dispatch(getMessages({auth, id}))
                setTimeout(() => {
                    refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
                }, 50)
            }
        }
        getMessagesData()
    }, [id, dispatch, auth, message.data])

    // Load More
    useEffect(() => {
        console.log(isLoadMore);
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setIsLoadMore(p => p + 1)
            }
        }, {
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    }, [setIsLoadMore])

    useEffect(() => {
        if (isLoadMore > 1) {
            if (result >= page * 9) {
                dispatch(loadMoreMessages({auth, id, page: page + 1}))
                setIsLoadMore(1)
            }
        }
    }, [isLoadMore])

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
                    <button style={{opacity: 0}} ref={pageEnd}>
                        Xem thêm
                    </button>

                    {data.map((msg, index) => (
                        <>
                            {
                                msg.sender !== auth.user._id ?
                                    <div className="message-body-chat other-message" key={index}>
                                        <MsgDisplay user={user} msg={msg} type="other"/>
                                    </div> :
                                    <div className="message-body-chat you-message" key={index}>
                                        <MsgDisplay user={auth.user} msg={msg} type="you" data={data}/>
                                    </div>
                            }
                        </>
                    ))}

                    {loadMedia && (
                        <div className="loading_message">
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