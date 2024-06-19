import React from 'react';
import { Form, Input, Button, Typography, Layout, Divider } from 'antd';
import { CloseOutlined, FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Đường dẫn tới file CSS của bạn

const { Title } = Typography;
const { Header, Content } = Layout;

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        navigate('/homepage');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleRegister = () => {
        navigate('/register'); // Giả sử bạn có trang đăng ký tại đường dẫn '/register'
    };

    return (
        <Layout className="login-layout">
            <Header className="login-header">
                <CloseOutlined className="back-icon" onClick={handleBackToHome} />
                <Button type="primary" className="register-button" onClick={handleRegister}>
                    Đăng ký
                </Button>
            </Header>
            <Content className="login-content">
                <div className="App">
                    <Title level={2} className="login-title">Đăng nhập</Title>
                    <Form
                        name="login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập Email hoặc số điện thoại!' }]}
                        >
                            <Input placeholder="Email hoặc số điện thoại" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password
                                placeholder="Mật khẩu"
                                addonAfter={<span className="forgot-password">Quên</span>}
                                className="input-large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider>hoặc</Divider>
                    <div className="social-login-buttons">
                        <Button className="social-button facebook-button" icon={<FacebookFilled />}>
                            Facebook
                        </Button>
                        <Button className="social-button google-button" icon={<GoogleOutlined />}>
                            Google
                        </Button>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default LoginPage;
