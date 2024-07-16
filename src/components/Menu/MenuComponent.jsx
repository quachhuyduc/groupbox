// MenuComponent.js
import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import './MenuComponent.css'; // Nhập tệp CSS

const items = [
    {
        key: 'sub1',
        label: 'Menu',
        icon: <MenuOutlined />,
        children: [
            {
                key: 'g1',
                type: 'group',
                children: [
                    { key: '1', label: 'Nhiệm vụ hôm nay' },
                    { key: '7', label: 'Nhóm của tôi' },
                    { key: '2', label: 'Bảng Xếp Hạng' },
                    { key: '3', label: 'Khám Phá' },
                    { key: '4', label: 'Profile' },
                    { key: '5', label: 'Cài đặt' },
                    { key: '6', label: 'Đăng xuất' },
                ],
            },
        ],
    },
];

const MenuComponent = ({ mode }) => {
    const navigate = useNavigate();

    const onClick = (e) => {
        console.log('click ', e);
        if (e.key === '1') {
            navigate('/homepage');
        }
        if (e.key === '4') {
            const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
            navigate(`/profile/${userId}`);
        }
        if (e.key === '2') {
            navigate('/ranklist');
        }
        if (e.key === '3') {
            navigate('/search');
        }
        // Add more conditions for other keys if needed
    };

    return (
        <Menu
            onClick={onClick}
            style={{ width: mode === 'horizontal' ? '100%' : 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={mode}
            items={items}
            className="custom-menu" // Áp dụng lớp CSS tuỳ chỉnh
        />
    );
};

export default MenuComponent;
