import React, { useEffect, useRef, useState } from 'react';
import MenuComponent from '../../components/Menu/MenuComponent';
import { Button, Card, Col, Row, Space, Typography, message } from 'antd';
import { EditOutlined, CloseOutlined, UserOutlined, CalendarOutlined, MailOutlined } from '@ant-design/icons';
import { getUser, updateUserAvatar } from '../../api/api';
import AchieveList from '../../components/AchieveList';
import RankList from '../../components/RankList/RankList';
import fire from '../../asset/fire.svg';
import lock from '../../asset/lock.svg';
import medall from '../../asset/medall.svg';
import lightning from '../../asset/lightning.svg';
import avatarr from '../../asset/avatarr.jpg';
import search from '../../asset/search.png';
import invite from '../../asset/invite.webp';

const { Text } = Typography;

const ProfilePage = () => {
    const [backgroundImage, setBackgroundImage] = useState(null);
    const fileInputRef = useRef(null);
    const [user, setUser] = useState(null);
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const userData = await getUser(userId);
                    setUser(userData.data);
                    const avatarUrl = `http://localhost:5000/${userData.data.avatarUrl}`;
                    setBackgroundImage(avatarUrl); // Use public URL
                } else {
                    throw new Error('User ID is not available');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []); // Empty dependency array to fetch user data only once on component mount

    const handleImageUpload = (event) => {
        const file = event?.target?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBackgroundImage(reader.result);
                setNewImage(file);
                setIsEditingImage(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setBackgroundImage(`/uploads/${user.avatarUrl}`); // Reset to original avatar using public URL
        setNewImage(null);
        setIsEditingImage(false);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSubmitImage = async () => {
        try {
            if (newImage) {
                const formData = new FormData();
                formData.append('avatar', newImage);
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const response = await updateUserAvatar(userId, formData);
                    if (response.status === 'OK') {
                        message.success('Cập nhật avatar thành công');
                        const avatarUrl = `http://localhost:5000/${response.data.avatarUrl}`;
                        setBackgroundImage(avatarUrl);
                        setNewImage(null);
                        setIsEditingImage(false);
                    } else {
                        throw new Error(response.message || 'Cập nhật thất bại');
                    }
                } else {
                    throw new Error('User ID is not available');
                }
            }
        } catch (error) {
            console.error('Failed to update avatar:', error);
            message.error(`Không thể cập nhật avatar: ${error.message}`);
        }
    };


    return (
        <>
            <div className="home-page-container">
                <MenuComponent mode="inline" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {user && (
                        <>
                            <Card
                                style={{
                                    width: '700px',
                                    marginLeft: '100px',
                                    marginTop: '20px',
                                    height: '250px',
                                    position: 'relative',
                                    backgroundImage: `url(${backgroundImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    border: '2px solid #58CC02',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Space style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                    {isEditingImage ? (
                                        <>
                                            <Button icon={<CloseOutlined />} onClick={clearImage} />
                                            <Button type="primary" onClick={handleSubmitImage}>Submit</Button>
                                        </>
                                    ) : (
                                        <Button icon={<EditOutlined />} onClick={triggerFileInput} />
                                    )}
                                </Space>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </Card>
                            <Card
                                style={{
                                    width: '700px',
                                    marginLeft: '100px',
                                    marginTop: '20px',
                                    border: '2px solid #58CC02',
                                    padding: '20px'
                                }}
                            >
                                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                                    Thông tin người dùng
                                </div>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <Row align="middle">
                                        <Col span={2}><UserOutlined style={{ fontSize: '20px' }} /></Col>
                                        <Col span={6}><Text strong>Tên:</Text></Col>
                                        <Col span={16}><Text>{user.name}</Text></Col>
                                        <Col span={2}><CalendarOutlined style={{ fontSize: '20px' }} /></Col>
                                        <Col span={6}><Text strong>Tuổi:</Text></Col>
                                        <Col span={16}><Text>{user.age}</Text></Col>
                                    </Row>
                                    <Row align="middle">
                                        <Col span={2}><MailOutlined style={{ fontSize: '20px' }} /></Col>
                                        <Col span={6}><Text strong>Email:</Text></Col>
                                        <Col span={16}><Text>{user.email}</Text></Col>
                                    </Row>
                                </Space>
                            </Card>
                        </>
                    )}
                    {!user && <div>Đang tải...</div>}
                    {/* //đoạn 1 */}
                    <hr style={{ width: '700px', marginLeft: '100px', marginTop: '20px', border: '1px solid black' }} />
                    <Card
                        style={{
                            width: '700px',
                            marginLeft: '100px',
                            marginTop: '20px',
                            border: '2px solid #58CC02'
                        }}
                    >
                        <span>Thống Kê</span>
                    </Card>
                    <div style={{ width: '700px', display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginLeft: '100px' }}>
                        <Card style={{ width: '300px', height: '100px', border: '2px solid #58CC02', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={fire} alt="Fire Icon" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>7 Ngày Streak!!</span>
                        </Card>
                        <Card style={{ width: '300px', height: '100px', border: '2px solid #58CC02', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={lightning} alt="lightning Icon" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>7 Số Nhiệm vụ đã hoàn thành trong tháng này</span>
                        </Card>
                    </div>
                    <div style={{ width: '700px', display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginLeft: '100px' }}>
                        <Card style={{ width: '300px', height: '100px', border: '2px solid #58CC02', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={lock} alt="lock Icon" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Điểm kiếm được: {user?.pointweek}</span>
                        </Card>
                        <Card style={{ width: '300px', height: '100px', border: '2px solid #58CC02', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={medall} alt="medal Icon" style={{ width: '35px', height: '35px', marginRight: '10px' }} />
                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>7: Số lần vào top 3</span>
                        </Card>
                    </div>

                    <hr style={{ width: '700px', marginLeft: '100px', marginTop: '20px', border: '1px solid black' }} />
                    <Card
                        style={{
                            width: '700px',
                            marginLeft: '100px',
                            marginTop: '20px',
                            border: '2px solid #58CC02'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px', fontWeight: 'bold', margin: '0 20px' }}>
                            <span>Thành tích</span>
                            <span>Xem tất cả</span>
                        </div>
                    </Card>
                    <div style={{ width: '700px', display: 'flex', marginTop: '20px', marginLeft: '100px' }}>
                        <Card style={{ width: '700px', border: '2px solid #58CC02' }}>
                            <AchieveList />
                        </Card>
                    </div>
                </div>
                {/* //đoạn 2 */}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>

                    <Card style={{ width: '400px', marginLeft: "50px", marginTop: '20px', border: '2px solid #58CC02', padding: '16px', height: '450px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '18px', lineHeight: "28px", fontStyle: "normal", fontWeight: "500" }}>Đang theo dõi</div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                <span style={{ fontSize: '18px', lineHeight: "28px", fontStyle: "normal", fontWeight: "500", marginRight: '8px' }}>Người Theo Dõi</span>

                            </div>
                        </div>
                        <div style={{ maxHeight: '350px', overflowY: 'auto', marginTop: "20px" }} className="hidden-scrollbar">
                            <RankList />
                        </div>

                    </Card>

                    <Card

                        style={{
                            width: '400px',
                            marginLeft: "50px",
                            marginTop: 30,
                            border: '2px solid #58CC02',
                            height: '250px',
                            padding: '16px'
                        }}
                    >
                        <span style={{ fontSize: '25px', fontWeight: 'bold' }}>Thêm bạn bè</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                                <img src={search} alt="Search Icon" style={{ width: '50px', height: '50px', marginRight: '18px' }} />
                                <Text strong style={{ fontSize: '22px', marginLeft: "15px", marginTop: "5px" }}>Tìm bạn bè</Text>
                            </div>
                            <div style={{ display: 'flex', marginTop: '20px' }}>
                                <img src={invite} alt="Search Icon" style={{ width: '50px', height: '50px', marginRight: '18px' }} />
                                <Text strong style={{ fontSize: '22px', marginLeft: "15px", marginTop: "10px" }}>Mời bạn bè</Text>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </>
    );
};

export default ProfilePage;
