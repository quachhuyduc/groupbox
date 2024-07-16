import React from 'react';
import { Form, Input, Button, Typography, Layout, Divider } from 'antd';
import { CloseOutlined, FacebookFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Đường dẫn tới file CSS của bạn
import axios from 'axios';

const { Title } = Typography;
const { Header, Content } = Layout;

const RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/register', values);
            console.log('Đăng ký thành công:', response.data);
            // Xử lý sau khi đăng ký thành công, ví dụ chuyển hướng trang
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error);
            // Xử lý lỗi, ví dụ hiển thị thông báo cho người dùng
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login'); // Giả sử bạn có trang đăng ký tại đường dẫn '/register'
    };

    return (
        <Layout className="register-layout">
            <Header className="register-header">
                <CloseOutlined className="back-icon" onClick={handleBackToHome} />
                <Button type="primary" className="login-button" onClick={handleLogin}>
                    Đăng nhập
                </Button>
            </Header>
            <Content className="register-content">
                <div className="App">
                    <Title level={2} className="register-title">Đăng ký</Title>
                    <Form
                        name="register"
                        className="register-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="age"
                            rules={[{ required: true, message: 'Vui lòng nhập Tuổi!' }]}
                        >
                            <Input placeholder="Tuổi" />
                        </Form.Item>
                        <Form.Item
                            name="name"
                        >
                            <Input placeholder="Tên (Tùy Chọn)" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập Email hoặc số điện thoại!' }]}
                        >
                            <Input placeholder="Email hoặc số điện thoại" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password placeholder="Mật khẩu" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="register-form-button">
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider>hoặc</Divider>

                    <Button type="primary" className="social-button facebook-button" icon={<FacebookFilled />}>
                        Facebook
                    </Button>
                </div>
            </Content>
        </Layout>
    );
};

export default RegisterPage;
