import { Col, Row } from 'antd';
import React from 'react'
import logo from '../../asset/Manchester_City_FC_logo.svg'
import './logo.css';
import MenuHeader from '../Menu/MenuHeader';
import { BellOutlined, LogoutOutlined } from '@ant-design/icons';

const HeaderComponent = () => {
    return (
        <Row style={{ backgroundColor: "green", height: "100px", alignItems: "center" }}>
            {/* Phần logo */}
            <Col span={6} style={{ display: 'flex', alignItems: 'center', paddingLeft: '250px' }}>
                <img src={logo} alt="logo" className="logo" style={{ height: '80px' }} />
            </Col>

            {/* Phần menu */}
            <Col span={12} style={{ display: "flex", flexDirection: "column", paddingLeft: "60px" }}>
                <MenuHeader />
            </Col>

            {/* Phần avatar và nút đăng xuất */}
            <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '350px' }}>
                <BellOutlined style={{ fontSize: '24px', color: 'white', marginRight: '20px' }} />
                <img src={logo} alt="avatar" className="avatar" style={{ height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                <span style={{ color: 'white', marginRight: '10px' }}>Đăng xuất</span>
                <LogoutOutlined style={{ fontSize: '24px', color: 'white' }} />
            </Col>
        </Row>
    );
}
export default HeaderComponent;
