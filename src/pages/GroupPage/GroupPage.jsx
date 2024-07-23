import React, { useEffect, useState } from 'react';
import { Card, Button, List, Avatar, Tooltip, message } from 'antd';
import MenuComponent from '../../components/Menu/MenuComponent';
import { getGroupkById } from '../../api/api';
import { useParams } from 'react-router-dom';
import MyComment from '../Comment/MyComment';
import { UserAddOutlined, LogoutOutlined } from '@ant-design/icons';

const GroupPage = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const addComment = (comment) => {
        setComments([comment, ...comments]);
    };
    const [comments, setComments] = useState([
        {
            title: 'Sample Title',
            userName: 'Sample User',
            content: 'Sample Comment',
            avatar: 'https://via.placeholder.com/50',
        },
    ]);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await getGroupkById(groupId);
                setGroup(response.data);
                setMessages(response.data.messages); // assuming messages are part of group data
            } catch (error) {
                console.error('Error fetching the group:', error);
            }
        };

        fetchGroup();
    }, [groupId]);

    const handleAddMember = () => {
        // Logic to add a member to the group
        message.success('Đang thêm thành viên vào nhóm...');
    };

    const handleLeaveGroup = () => {
        // Logic to leave the group
        message.info('Đang rời khỏi nhóm...');
    };


    return (
        <div className="home-page-container" style={{ display: 'flex' }}>
            <MenuComponent mode="inline" selectedKey="7" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Card
                    title={` ${group ? group.name : 'Loading...'}`}
                    bordered={false}
                    style={{ width: '700px', marginTop: '30px', marginLeft: "100px", display: 'flex', flexDirection: 'column' }}
                >
                    <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={messages}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        description={item.content}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Card>
                <div style={{ width: '700px', marginTop: '30px', marginLeft: "100px" }}>
                    <MyComment addComment={addComment} />
                </div>
            </div>

            <div style={{ flex: 1, padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                    <Card
                        style={{ width: '400px', marginLeft: "50px", marginTop: '20px', border: '2px solid #58CC02', padding: '16px', height: '450px' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '22px', lineHeight: "28px", fontStyle: "normal", fontWeight: "700" }}>Thông tin nhóm</div>
                            <div>
                                <Tooltip title="Thêm thành viên vào nhóm">
                                    <Button type="text" icon={<UserAddOutlined />} onClick={handleAddMember} />
                                </Tooltip>
                                <Tooltip title="Rời nhóm">
                                    <Button type="text" icon={<LogoutOutlined />} onClick={handleLeaveGroup} />
                                </Tooltip>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                            <Avatar size={64} src={group ? group.avatarUrl : 'default-avatar-url'} />
                        </div>
                        <div style={{ maxHeight: '280px', overflowY: 'auto', marginTop: "20px" }} className="hidden-scrollbar">
                            {group ? (
                                <div>
                                    <p><strong>Tên nhóm:</strong> {group.name}</p>
                                    <p><strong>Số thành viên:</strong> {group.members.length}</p>
                                    <p><strong>Số nhiệm vụ đã hoàn thành:</strong> {group.tasksCompleted}</p>
                                    <p><strong>Ngày thành lập:</strong> {new Date(group.createdAt).toLocaleDateString()}</p>
                                </div>
                            ) : (
                                <p>Đang tải thông tin nhóm...</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default GroupPage;
