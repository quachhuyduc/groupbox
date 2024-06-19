import React, { useState, useEffect } from 'react';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

const ImageSlider = ({ images = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = Math.ceil(images.length / 2);
    const [hovered, setHovered] = useState(false);

    // Hàm để chuyển đến slide tiếp theo
    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === totalSlides - 1 ? 0 : prevSlide + 1));
    };

    // Hàm để chuyển đến slide trước đó
    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? totalSlides - 1 : prevSlide - 1));
    };

    // Tự động chuyển slide
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Chuyển slide mỗi 3 giây

        return () => clearInterval(interval); // Xóa interval khi component bị unmount
    }, []);

    return (
        <div style={{ position: 'relative', maxWidth: '100%', overflow: 'hidden' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <div
                style={{
                    display: 'flex',
                    transition: 'transform 0.5s ease-in-out',
                    transform: `translateX(-${currentSlide * 100 / totalSlides}%)`,
                    width: `${totalSlides * 100}%`,
                }}
            >
                {Array.from({ length: totalSlides }, (_, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            gap: '10px', // Thêm khoảng cách giữa các hình ảnh
                        }}
                    >
                        <img
                            src={images[index * 2]}
                            alt={`Slide ${index * 2 + 1}`}
                            style={{
                                width: '50%',
                                height: 'auto',
                                borderRadius: '8px',
                            }}
                        />
                        {images[index * 2 + 1] && (
                            <img
                                src={images[index * 2 + 1]}
                                alt={`Slide ${index * 2 + 2}`}
                                style={{
                                    width: '50%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
            {hovered && (
                <>
                    <LeftCircleOutlined
                        onClick={prevSlide}
                        style={{
                            position: 'absolute',
                            left: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: 'blue',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            padding: '10px',
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Tùy chọn: thêm bóng đổ để hiển thị rõ hơn
                        }}
                    />
                    <RightCircleOutlined
                        onClick={nextSlide}
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: 'blue',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            padding: '10px',
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Tùy chọn: thêm bóng đổ để hiển thị rõ hơn
                        }}
                    />
                </>
            )}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                {Array.from({ length: totalSlides }, (_, index) => (
                    <span
                        key={index}
                        style={{
                            display: 'inline-block',
                            width: '20px',
                            height: '4px',
                            margin: '0 5px',
                            borderRadius: '2px',
                            backgroundColor: index === currentSlide ? 'blue' : 'gray',
                            cursor: 'pointer',
                        }}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>

        </div>
    );
};

export default ImageSlider;
