import React, { useEffect, useRef, useState } from 'react';
import MenuComponent from '../../components/Menu/MenuComponent';
import { Button, Card, Col, Row, Space, Typography, message, Input } from 'antd';
import { EditOutlined, CloseOutlined, UserOutlined, CalendarOutlined, MailOutlined } from '@ant-design/icons';
import { getUser, updateUserAvatar, updateUser } from '../../api/api'; // Thêm hàm updateUser
import AchieveList from '../../components/AchieveList';
import RankList from '../../components/RankList/RankList';
import fire from '../../asset/fire.svg';
import lock from '../../asset/lock.svg';
import medall from '../../asset/medall.svg';
import lightning from '../../asset/lightning.svg';
import search from '../../asset/search.png';
import invite from '../../asset/invite.webp';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;

const ProfilePage = () => {
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [user, setUser] = useState(null);
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const handleNavigateToSearch = () => {
        navigate('/search/user'); // Điều hướng đến trang tìm kiếm
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const userData = await getUser(userId);
                    setUser(userData.data);
                    setNameInput(userData.data.name);
                    setEmailInput(userData.data.email);
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

    const handleEditName = () => {
        setIsEditingName(true);
    };

    const handleEditEmail = () => {
        setIsEditingEmail(true);
    };

    const handleSaveName = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await updateUser(userId, { name: nameInput });
                if (response.status === 'OK') {
                    message.success('Cập nhật tên thành công');
                    setUser(prevUser => ({ ...prevUser, name: nameInput }));
                    setIsEditingName(false);
                } else {
                    throw new Error(response.message || 'Cập nhật thất bại');
                }
            } else {
                throw new Error('User ID is not available');
            }
        } catch (error) {
            console.error('Failed to update name:', error);
            message.error(`Không thể cập nhật tên: ${error.message}`);
        }
    };

    const handleSaveEmail = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await updateUser(userId, { email: emailInput });
                if (response.status === 'OK') {
                    message.success('Cập nhật email thành công');
                    setUser(prevUser => ({ ...prevUser, email: emailInput }));
                    setIsEditingEmail(false);
                } else {
                    throw new Error(response.message || 'Cập nhật thất bại');
                }
            } else {
                throw new Error('User ID is not available');
            }
        } catch (error) {
            console.error('Failed to update email:', error);
            message.error(`Không thể cập nhật email: ${error.message}`);
        }
    };

    return (
        <>
            <div className="home-page-container">
                <MenuComponent mode="inline" selectedKey="4" />
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
                                        <Col span={16}>
                                            {isEditingName ? (
                                                <>
                                                    <Input
                                                        value={nameInput}
                                                        onChange={(e) => setNameInput(e.target.value)}
                                                        style={{ width: '70%' }}
                                                    />
                                                    <Button onClick={handleSaveName} type="primary">Lưu</Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Text>{user.name}</Text>
                                                    <Button
                                                        icon={<EditOutlined />}
                                                        onClick={handleEditName}
                                                        style={{ marginLeft: '235px' }}
                                                    />
                                                </>
                                            )}
                                        </Col>
                                    </Row>

                                    <Row align="middle">
                                        <Col span={2}><MailOutlined style={{ fontSize: '20px' }} /></Col>
                                        <Col span={6}><Text strong>Email:</Text></Col>
                                        <Col span={16}>
                                            {isEditingEmail ? (
                                                <>
                                                    <Input
                                                        value={emailInput}
                                                        onChange={(e) => setEmailInput(e.target.value)}
                                                        style={{ width: '70%' }}
                                                    />
                                                    <Button onClick={handleSaveEmail} type="primary">Lưu</Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Text>{user.email}</Text>
                                                    <Button
                                                        icon={<EditOutlined />}
                                                        onClick={handleEditEmail}
                                                        style={{ marginLeft: '200px' }}
                                                    />
                                                </>
                                            )}
                                        </Col>
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
                            <div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginTop: '20px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s, transform 0.3s',
                                    }}
                                    onClick={handleNavigateToSearch}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f0f0f0'; // Màu nền khi hover
                                        e.currentTarget.style.transform = 'scale(1.02)'; // Tăng kích thước nhẹ
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent'; // Khôi phục màu nền khi không hover
                                        e.currentTarget.style.transform = 'scale(1)'; // Khôi phục kích thước
                                    }}
                                >
                                    <img src={search} alt="Search Icon" style={{ width: '50px', height: '50px', marginRight: '18px' }} />
                                    <Text strong style={{ fontSize: '22px', marginLeft: "15px", marginTop: "5px" }}>Tìm bạn bè</Text>
                                </div>
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
