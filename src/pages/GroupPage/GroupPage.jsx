import React, { useEffect, useState } from 'react';
import { Card, Button, List, Avatar, Tooltip, Modal, Input, message, Spin } from 'antd';
import MenuComponent from '../../components/Menu/MenuComponent';
import { getGroupForMember, searchUserByName, addMemberToGroup, getUser } from '../../api/api';
import { useParams } from 'react-router-dom';
import { fetchMembers } from '../../redux/slides/memberSlice';
import { UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import RankGroupList from '../../components/RankList/RankGroupList';
import { useDispatch, useSelector } from 'react-redux';
import MyComment from '../../components/Comment/MyComment';
import InformationMember from '../../components/RankList/InformationMember';
const GroupPage = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [comments, setComments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { members } = useSelector((state) => state.members);
    const [currentUser, setCurrentUser] = useState(null);
    const [userRank, setUserRank] = useState(null);
    const [isMember, setIsMember] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await getGroupForMember(groupId, userId);
                if (response.status === 'OK') {
                    setGroup(response.data);
                    setIsMember(response.data.members.some(member => member._id === userId)); // Kiểm tra xem người dùng có phải là thành viên không
                } else {
                    console.error('Không thể lấy thông tin nhóm:', response.message);
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin nhóm:', error);
            }
        };

        fetchGroup();
        dispatch(fetchMembers(groupId));
    }, [groupId, dispatch]);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const userDataResponse = await getUser(userId);
                    const userData = userDataResponse.data;
                    if (userData && userData.avatarUrl) {
                        userData.avatarUrl = `http://localhost:5000/${userData.avatarUrl}`;
                    }
                    setCurrentUser(userData);

                    if (group) {
                        // Tạo một bản sao của mảng members để sắp xếp
                        const sortedMembers = [...members].sort((a, b) => b.pointday - a.pointday);
                        const rank = sortedMembers.findIndex(member => member._id === userData._id) + 1;
                        setUserRank(rank);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [group, members]);


    const handleAddMember = () => {
        setIsModalOpen(true);
    };

    const handleSearch = async () => {
        try {
            const results = await searchUserByName(searchQuery);
            setSearchResults(results.data); // giả định rằng API trả về danh sách người dùng trong `data.users`
        } catch (error) {
            console.error('Lỗi khi tìm kiếm người dùng:', error);
            message.error('Không thể tìm kiếm người dùng');
        }
    };

    const handleAddUserToGroup = async (userId) => {
        try {
            console.log('Adding user:', userId);
            const response = await addMemberToGroup(groupId, userId);
            console.log('API Response:', response);
            message.success('Thêm thành viên thành công');

            // Cập nhật lại danh sách thành viên qua Redux
            dispatch(fetchMembers(groupId));

            setIsModalOpen(false);
        } catch (error) {
            console.error('Lỗi khi thêm thành viên:', error);
            message.error(`Không thể thêm thành viên: ${error.message}`);
        }
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addComment = (comment) => {
        setComments([comment, ...comments]);
    };

    if (!currentUser) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <div>Đang tải...</div>
            </div>
        );
    }
    return (
        <div className="home-page-container" style={{ display: 'flex' }}>
            <MenuComponent mode="inline" selectedKey="7" />
            {!isMember ? (
                <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: '#ff4d4f' }}>
                    Bạn chưa tham gia nhóm nào, hãy tham gia nhóm
                </div>
            ) : (
                <>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Card
                            title={
                                <div style={{
                                    textAlign: 'center',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    backgroundColor: "rgb(88, 204, 2)",
                                    padding: '10px',
                                    borderRadius: '5px'
                                }}>
                                    {group ? group.name : 'Loading...'}
                                </div>
                            }
                            bordered={false}
                            style={{ width: '800px', marginTop: '30px', marginLeft: "100px", display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
                                <h2 style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    marginBottom: '10px',
                                    textAlign: 'center', // Căn giữa tiêu đề
                                    backgroundColor: '#1890ff', // Màu nền xanh
                                    color: '#fff', // Màu chữ trắng
                                    padding: '10px', // Khoảng cách giữa chữ và viền
                                    borderRadius: '5px' // Bo góc cho nền
                                }}>Bảng Xếp Hạng</h2>
                                <RankGroupList />
                            </div>
                        </Card>
                        <div style={{ width: '800px', marginTop: '30px', marginLeft: "100px" }}>
                            <MyComment
                                addComment={addComment}
                                titleName={currentUser.name}
                                avatar={currentUser.avatarUrl} // Sử dụng avatarUrl
                            />
                        </div>
                    </div>


                    <div style={{ flex: 1, padding: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Card
                                className="hidden-scrollbar"
                                style={{ width: '400px', marginLeft: "50px", marginTop: '20px', border: '2px solid #58CC02', height: '300px', overflowY: 'auto' }}
                            >

                                <InformationMember />

                            </Card>
                            <Card
                                style={{ width: '400px', marginLeft: "50px", marginTop: '20px', border: '2px solid #58CC02', padding: '16px', height: '200px' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ fontSize: '22px', lineHeight: "28px", fontStyle: "normal", fontWeight: "700" }}>Thông tin nhóm</div>
                                    <div>
                                        <Tooltip title="Thêm thành viên vào nhóm">
                                            <Button type="text" icon={<UserAddOutlined />} onClick={handleAddMember} />
                                        </Tooltip>
                                        <Tooltip title="Rời nhóm">
                                            <Button type="text" icon={<LogoutOutlined />} onClick={() => message.info('Đang rời khỏi nhóm...')} />
                                        </Tooltip>
                                    </div>
                                </div>
                                <div style={{ maxHeight: '280px', overflowY: 'auto', marginTop: "20px" }} className="hidden-scrollbar">
                                    {group ? (
                                        <div>
                                            <p><strong>Tên nhóm:</strong> {group.name}</p>
                                            <p><strong>Số thành viên:</strong> {members.length}</p>
                                        </div>
                                    ) : (
                                        <p>Đang tải thông tin nhóm...</p>
                                    )}
                                </div>
                            </Card>

                        </div>
                    </div>
                </>
            )}
            <Modal
                title="Thêm thành viên vào nhóm"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Input.Search
                    placeholder="Nhập tên người dùng"
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={handleSearch}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <List
                    itemLayout="horizontal"
                    dataSource={searchResults}
                    renderItem={user => (
                        <List.Item
                            actions={[<Button onClick={() => handleAddUserToGroup(user._id)}>Thêm</Button>]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={`http://localhost:5000/${user.avatarUrl}`} />}
                                title={user.name}
                                description={user.email}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
}

export default GroupPage;
