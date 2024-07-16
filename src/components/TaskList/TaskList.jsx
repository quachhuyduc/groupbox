import React from 'react';
import { ReadOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, List } from 'antd';
import CheckList from './CheckList';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// const data = Array.from({ length: 3 }).map((_, i) => ({
//     href: 'https://ant.design',
//     // title: titles[i % titles.length],
//     avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
//     content:
//         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// }));

const TaskList = () => {
    const navigate = useNavigate();
    const tasks = useSelector(state => state.tasks.tasks);

    const handleDetail = (title) => {
        if (title === 'Nghe nhạc và làm nhiệm vụ') {
            navigate('/detail/lyrics');
        } else if (title === 'Xem đoạn video và làm nhiệm vụ') {
            navigate('/detail/video');
        } else {
            navigate('/detail');
        }
    };

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{ pageSize: 3 }}
            dataSource={tasks}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    extra={
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button style={{ backgroundColor: "rgb(88, 204, 2)", height: '35px', padding: '0 10px' }} onClick={() => handleDetail(item.title)}>
                                    <ReadOutlined style={{ fontSize: '18px', color: "white", marginRight: '4px' }} />
                                    <span style={{ fontSize: '18px', fontWeight: "500", color: "white" }}>Chi tiết</span>
                                </Button>
                                <CheckList taskId={item.id} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: " 10px", marginRight: "40px" }}>
                                <Card style={{ backgroundColor: "rgb(88, 204, 2)", height: '35px', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                                        10 point
                                    </span>
                                </Card>
                            </div>

                        </div>
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href} style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.title}</a>}
                        description={item.content}
                    />
                </List.Item>
            )}
        />
    );
};

export default TaskList;