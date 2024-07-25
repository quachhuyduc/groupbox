import React from 'react';
import { List, Avatar } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
    <span>
        {React.createElement(icon)} {text}
    </span>
);

// const getFileExtension = (filename) => {
//     const parts = filename.split('.');
//     return parts.length > 1 ? parts.pop().toLowerCase() : '';
// };

const CommentList = ({ comments }) => {
    console.log("Comments data:", comments);

    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={comments}
            renderItem={(item) => {
                console.log("Rendering item:", item);

                // Ensure `files` is an array
                const files = Array.isArray(item.files) ? item.files : [item.files];
                console.log("Files:", files);

                return (
                    <List.Item
                        key={item._id}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                item.user && item.user.avatarUrl ? (
                                    <Avatar src={`http://localhost:5000/${item.user.avatarUrl}`} />
                                ) : (
                                    <Avatar />
                                )
                            }
                            title={
                                item.user && item.user.name ? (
                                    <a href='/'>{item.user.name}</a>
                                ) : (
                                    <a href='/'>Anonymous</a>
                                )
                            }
                            description={`Posted on ${new Date(item.createdAt).toLocaleString()}`}
                        />
                        <div>{item.content}</div>
                        {/* {files && files.length > 0 && (
                            <div>
                                {files.map((file, index) => {
                                    const fileExtension = getFileExtension(file);
                                    console.log("File:", file);
                                    console.log("File extension:", fileExtension);

                                    const fileUrl = `http://localhost:5000/uploads/${encodeURIComponent(file)}`;
                                    console.log("File URL:", fileUrl);

                                    return (
                                        <div key={index} style={{ marginTop: '10px' }}>
                                            {fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' ? (
                                                <img src={fileUrl} alt={`file-${index}`} style={{ width: '200px', height: '100px' }} />
                                            ) : fileExtension === 'mp4' || fileExtension === 'mov' ? (
                                                <video controls style={{ width: '200px', height: '100px' }}>
                                                    <source src={fileUrl} type={`video/${fileExtension}`} />
                                                </video>
                                            ) : fileExtension === 'wav' || fileExtension === 'mp3' ? (
                                                <audio controls style={{ width: '100%', marginTop: '10px' }}>
                                                    <source src={fileUrl} type={`audio/${fileExtension}`} />
                                                </audio>
                                            ) : (
                                                <div>Unsupported file type</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {item.audio && (
                            <audio controls style={{ width: '100%', marginTop: '10px' }}>
                                <source src={`http://localhost:5000/uploads/${encodeURIComponent(item.audio)}`} type="audio/wav" />
                            </audio>
                        )} */}
                    </List.Item>
                );
            }}
        />
    );
};

export default CommentList;
