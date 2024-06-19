import React from 'react';
import { ReadOutlined } from '@ant-design/icons';
import { Avatar, Button, List } from 'antd';
import CheckList from './CheckList';
import ProgressTask from '../Progress/ProgressTask';

const titles = [
    'Đọc sách',
    'Viết báo cáo',
    'Làm bài tập',
    'Đi bộ',
    'Nấu ăn',
    'Học tiếng Anh',
    'Xem phim',
    'Chơi game',
    'Nghe nhạc',
    'Dọn dẹp nhà cửa',
    'Đi mua sắm',
    'Lập trình',
    'Thiền',
    'Chơi thể thao',
    'Đi du lịch',
    'Chăm sóc cây cối',
    'Đọc tin tức',
    'Viết nhật ký',
    'Học nấu ăn mới',
    'Gặp gỡ bạn bè',
    'Tham gia hội thảo',
    'Tập yoga',
    'Làm thủ công'
];




const data = Array.from({
    length: 23,
}).map((_, i) => ({
    href: 'https://ant.design',
    title: titles[i % titles.length],
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
// const IconText = ({ icon, text }) => (
//     <Space>
//         {React.createElement(icon)}
//         {text}
//     </Space>
// );
const TaskList = () => (
    <List
        itemLayout="vertical"
        size="large"
        pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
            <List.Item
                key={item.title}
                extra={
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button style={{ display: 'flex', alignItems: 'center', backgroundColor: "rgb(88, 204, 2)", height: '35px', padding: '0 10px' }}>
                                <ReadOutlined style={{ fontSize: '18px', color: "white", marginRight: '4px' }} />
                                <span style={{ fontSize: '18px', fontWeight: "500", color: "white" }}>Chi tiết</span>
                            </Button>
                            <CheckList />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <ProgressTask />
                        </div>
                    </div>

                }
            >
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href} style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.title}</a>} // Tăng kích thước và làm đậm chữ tiêu đề
                    description={item.description}
                />
                {item.content}
            </List.Item>
        )}
    />
);
export default TaskList;