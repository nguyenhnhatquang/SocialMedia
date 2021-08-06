import React, {useState, useRef, useEffect} from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../redux/actions/globalTypes'
import {createPost, updatePost} from '../redux/actions/postAction'
import {imageShow, videoShow} from '../utils/mediaShow'

const StatusModal = () => {
    const {auth, theme, status, socket} = useSelector((state) => state);
    const dispatch = useDispatch();

    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [stream, setStream] = useState(false);
    const videoRef = useRef();
    const refCanvas = useRef();
    const [tracks, setTracks] = useState("");

    const handleChangeImages = (e) => {
        const files = [...e.target.files];
        let err = "";
        let newImages = [];

        files.forEach((file) => {
            if (!file) return (err = "Thư mục không tồn tại1");

            if (file.size > 1024 * 1024 * 5) {
                return (err = "Ảnh/Video có kích thước lớn hơn 5Mb");
            }

            return newImages.push(file);
        });

        if (err) dispatch({type: GLOBALTYPES.ALERT, payload: {error: err}});
        setImages([...images, ...newImages]);
    };

    const deleteImages = (index) => {
        const newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr);
    };

    const handleStream = () => {
        setStream(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({video: true})
                .then((mediaStream) => {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();

                    const track = mediaStream.getTracks();
                    setTracks(track[0]);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width);
        refCanvas.current.setAttribute("height", height);

        const ctx = refCanvas.current.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        let URL = refCanvas.current.toDataURL();
        setImages([...images, {camera: URL}]);
    };

    const handleStopStream = () => {
        if (tracks) {
            tracks.stop();
            setStream(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (images.length > 5)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: "Vui lòng không chọn quá 5 ảnh/video"},
            });

        if (images.length === 0)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: "Vui lòng chọn ít nhất 1 ảnh/video"},
            });

        if (status.onEdit) {
            dispatch(updatePost({content, images, auth, status}));
        } else {
            dispatch(createPost({content, images, auth, socket}));
        }

        setContent("");
        setImages([]);
        if (tracks) tracks.stop();
        dispatch({type: GLOBALTYPES.STATUS, payload: false});
    };

    useEffect(() => {
        if (status.onEdit) {
            setContent(status.content);
            setImages(status.images);
        }
    }, [status]);

    return (
        <div className="status-modal">
            <form className="status-modal_form" onSubmit={handleSubmit}>
                <div className="status-modal_header">
                    <span className="status-modal_header-title">Tạo bài viết</span>
                    <img
                        className="search-icon--close"
                        src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626912787/icon/error_l9krog.svg"
                        alt="message"
                        onClick={() => {
                            dispatch({
                                type: GLOBALTYPES.STATUS,
                                payload: false,
                            });
                            handleStopStream();
                        }}
                    />
                </div>

                <div className="status-modal_body">
                    <textarea
                        className="status-modal_body-textArea"
                        name="content"
                        value={content}
                        placeholder={"Bạn đang nghĩ gì thế?"}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="status-modal_body-images">
                        {images.map((img, index) => (
                            <div key={index} className="status-modal_body-image">
                                {img.camera ? (
                                    imageShow(img.camera, theme)
                                ) : img.url ? (
                                    <>
                                        {img.url.match(/video/i)
                                            ? videoShow(img.url, theme)
                                            : imageShow(img.url, theme)}
                                    </>
                                ) : (
                                    <>
                                        {img.type.match(/video/i)
                                            ? videoShow(
                                                URL.createObjectURL(img),
                                                theme
                                            )
                                            : imageShow(
                                                URL.createObjectURL(img),
                                                theme
                                            )}
                                    </>
                                )}
                                <span
                                    className="status-modal_body-imageClose"
                                    onClick={() => deleteImages(index)}
                                >
                                  <img
                                      className="search-icon--close"
                                      src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626912787/icon/error_l9krog.svg"
                                      alt="close"
                                  />
                                </span>
                            </div>
                        ))}
                    </div>

                    {stream && (
                        <div className="status-modal_body-stream">
                            <video
                                autoPlay
                                muted
                                ref={videoRef}
                                width="100%"
                                height="100%"
                                style={{filter: theme ? "invert(1)" : "invert(0)"}}
                            />

                            <span className="status-modal_body-streamClose" onClick={handleStopStream}>
                                 <img
                                     className="search-icon--close"
                                     src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1626912787/icon/error_l9krog.svg"
                                     alt="close"
                                 />
                            </span>
                            <canvas ref={refCanvas} style={{display: "none"}}/>
                        </div>
                    )}

                    <div className="status-modal_body-icons">
                        {stream ? (
                            <img
                                className="status-modal_body-icon"
                                src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627442036/icon/camera_daaon8.svg"
                                alt="message"
                                onClick={handleCapture}
                            />
                        ) : (
                            <>
                                <img
                                    className="status-modal_body-icon"
                                    src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627442036/icon/camera_daaon8.svg"
                                    alt="message"
                                    onClick={handleStream}
                                />
                                <div>
                                    <label htmlFor="file">
                                        <img
                                            className="status-modal_body-icon"
                                            src="https://res.cloudinary.com/nguyenhnhatquang/image/upload/v1627442469/icon/picture_sphbkd.svg"
                                            alt="message"
                                        />
                                    </label>
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        multiple
                                        accept="image/* video/mp4"
                                        onChange={handleChangeImages}
                                        style={{display: "none"}}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <button
                    className="status-modal_submit"
                    type="submit"
                    variant="contained"
                    disabled={content ? false : true}
                >
                    Đăng
                </button>
            </form>
        </div>
    );
}

export default StatusModal
