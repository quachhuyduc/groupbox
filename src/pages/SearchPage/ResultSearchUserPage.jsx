import React, { useEffect, useState } from 'react';
import MenuComponent from '../../components/Menu/MenuComponent';
import { Card, Col, Row, Space, Typography } from 'antd';
import { UserOutlined, CalendarOutlined, MailOutlined } from '@ant-design/icons';
import { getUser } from '../../api/api'; // Thêm hàm updateUser
import AchieveList from '../../components/AchieveList';
import RankList from '../../components/RankList/RankList';
import fire from '../../asset/fire.svg';
import lock from '../../asset/lock.svg';
import medall from '../../asset/medall.svg';
import lightning from '../../asset/lightning.svg';
import { useParams } from 'react-router-dom';
const { Text } = Typography;

const ResultSearchUserPage = () => {
    const { userId } = useParams();
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {

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
                                    </Row>

                                    <Row align="middle">
                                        <Col span={2}><MailOutlined style={{ fontSize: '20px' }} /></Col>
                                        <Col span={6}><Text strong>Email:</Text></Col>
                                        <Col span={16}><Text>{user.email}</Text></Col>
                                    </Row>
                                    <Row align="middle">
                                        <Col span={2}><CalendarOutlined style={{ fontSize: '20px' }} /></Col>
                                        <Col span={6}><Text strong>Tuổi:</Text></Col>
                                        <Col span={16}><Text>{user.age}</Text></Col>
                                    </Row>
                                </Space>
                            </Card>
                        </>
                    )}
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

            </div>
        </>
    );
};

export default ResultSearchUserPage;
