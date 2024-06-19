import React from 'react';
import { Form, Input, Button, Typography, Layout, Divider } from 'antd';
import { CloseOutlined, FacebookFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Đường dẫn tới file CSS của bạn

const { Title } = Typography;
const { Header, Content } = Layout;

const RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
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
                        name="login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                        >
                            <Input placeholder="Tuổi" />
                        </Form.Item>
                        <Form.Item
                            name="username"
                        >
                            <Input placeholder="Tên (Tùy Chọn)" />
                        </Form.Item>
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

                    <Button type="primary" className="social-button facebook-button" icon={<FacebookFilled />}>
                        Facebook
                    </Button>


                </div>
            </Content>
        </Layout>
    );
};

export default RegisterPage;
