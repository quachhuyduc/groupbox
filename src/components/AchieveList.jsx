import React from 'react';
import { Image, List, Progress } from 'antd';
import fireflame from './../asset/fireflame.webp';
import medalgold from './../asset/medalgold.jpg';
import book from './../asset/book.png';

const titles = [
    'Đọc sách',
    'Viết báo cáo',
    'Làm bài tập',
];

// Define array of image URLs
const imageUrls = [
    fireflame,
    medalgold,
    book,
];

const data = Array.from({ length: 3 }).map((_, i) => ({
    href: 'https://ant.design',
    title: titles[i % titles.length],
    avatar: imageUrls[i % imageUrls.length], // Use image URL from imageUrls array
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const AchieveList = () => {

    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    key={item.title}
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    {/* Image and Level */}
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: 16, flexDirection: "column" }}>
                        <Image
                            src={item.avatar}
                            style={{ height: 100, borderRadius: '10%', width: "100px" }} // Đường viền bo tròn ở đây
                        />
                        <div style={{}}>
                            <p style={{ fontSize: "18px", fontWeight: 'bold' }}>Cấp độ: 1</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, marginBottom: "30px" }}>
                        {/* Title */}
                        <a href={item.href} style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            {item.title}
                        </a>
                        {/* Progress bar for achievement level */}
                        <Progress percent={50} status="active" />

                        {/* Description */}
                        <p>{item.content}</p>
                    </div>
                </List.Item>

            )}
        />
    );
};

export default AchieveList;
