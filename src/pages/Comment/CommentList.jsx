import React from 'react';
import { List, Avatar } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
    <span>
        {React.createElement(icon)} {text}
    </span>
);

const ReadBookList = ({ comments }) => (
    <List
        itemLayout="vertical"
        size="large"
        dataSource={comments}
        renderItem={(item) => (
            <List.Item
                key={item.title}
                actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href='/'>{item.title}</a>}
                    description={item.userName}
                />
                <div>{item.content}</div>
                {item.files && item.files.length > 0 && (
                    <div>
                        {item.files.map(file => (
                            <div key={file.uid} style={{ marginTop: '10px' }}>
                                {file.type.startsWith('image') && (
                                    <img src={URL.createObjectURL(file.originFileObj)} alt={file.name} style={{ width: '100px' }} />
                                )}
                                {file.type.startsWith('video') && (
                                    <video controls style={{ width: '100px' }}>
                                        <source src={URL.createObjectURL(file.originFileObj)} type={file.type} />
                                    </video>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {item.audio && (
                    <audio controls style={{ width: '100%', marginTop: '10px' }}>
                        <source src={item.audio} type="audio/wav" />
                    </audio>
                )}
            </List.Item>
        )}
    />
);

export default ReadBookList;
