import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Layout, Row } from 'antd';
import './MainPage.css'; // Tệp CSS của bạn
import seaction2 from '../../asset/seaction2.jpg';
import homepage1 from '../../asset/homepage1.jpg';

const { Header, Content, Footer } = Layout;

const MainPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <Layout className="login-page">
            <Header className="header">
                <div className="logo">
                    {/* <img src={logo} alt="Logo" /> */}
                </div>
                {/* <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
                    <Menu.Item key="language">
                        <Select defaultValue="en" style={{ width: 120 }}>
                            <Option value="en">English</Option>
                            <Option value="vi">Tiếng Việt</Option>
                        </Select>
                    </Menu.Item>
                </Menu> */}
            </Header>

            <Content className="content">
                <div className="hero-section">
                    <span className="animated-heading">Welcome to Social Group</span>
                </div>
                <Row className="form-login">
                    <Col span={12}>
                        <span className="animated-formlogin">Đăng ký ngay để trải nghiệm nhiều điều thú vị với Social Group!!</span>
                    </Col>
                    <Col span={12}>
                        <div style={{ marginBottom: '20px' }}>
                            <Button type="primary" size="large" style={{ marginRight: '10px', width: '70%', height: '50px' }}>Đăng ký ngay</Button>
                        </div>
                        <div>
                            <Button size="large" style={{ marginRight: '10px', width: '70%', height: '50px' }} onClick={handleLoginClick}>Tôi đã có tài khoản</Button>
                        </div>
                    </Col>
                </Row>

                <Row className="form-seaction1">
                    <Col span={12}>
                        <span className="animated-formlogin">Miễn phí, vui nhộn, hiệu quả</span>
                    </Col>
                    <Col span={12}>
                        <img className="img-seaction1" src={homepage1} alt="Section 1" />
                    </Col>
                </Row>

                <Row className="form-seaction2">
                    <Col span={12}>
                        <img className="img-seaction2" src={seaction2} alt="Section 2" />
                    </Col>
                    <Col span={12}>
                        <span className="animated-formlogin">Miễn phí, vui nhộn, hiệu quả</span>
                    </Col>
                </Row>

                <Row className="form-seaction1">
                    <Col span={12}>
                        <span className="animated-formlogin">Miễn phí, vui nhộn, hiệu quả</span>
                    </Col>
                    <Col span={12}>
                        <img className="img-seaction3" src={homepage1} alt="Section 3" />
                    </Col>
                </Row>

                <Row className="form-seaction2">
                    <Col span={12}>
                        <img className="img-seaction4" src={seaction2} alt="Section 4" />
                    </Col>
                    <Col span={12}>
                        <span className="animated-formlogin">Miễn phí, vui nhộn, hiệu quả</span>
                    </Col>
                </Row>
            </Content>

            <Footer className="footer">
                ©2023 Created by Your Name
            </Footer>
        </Layout>
    );
};

export default MainPage;
