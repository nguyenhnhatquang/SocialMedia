import React, {useEffect, useRef, useState} from 'react'

const delay = 2500;

const Carousel = ({images, id}) => {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );
        return () => {
        };
    }, [index]);

    return (
        <div className="slide-show" id={id}>
            <div className="slide-show-slider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {images.map((img, index) => (
                    <div key={index} className="slide">
                        {img.url.match(/video/i) ? (
                            <video
                                controls
                                src={img.url}
                                alt={img.url}
                            />
                        ) : (
                            <img
                                src={img.url}
                                alt={img.url}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="slide-show-dots">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slide-show-dot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Carousel;
