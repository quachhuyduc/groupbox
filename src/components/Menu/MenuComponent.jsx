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
                    { key: '3', label: 'Danh sách nhiệm vụ' },
                    { key: '8', label: 'Kết nối với bạn bè' },
                    { key: '4', label: 'Profile' },
                    { key: '5', label: 'Cài đặt' },
                    { key: '6', label: 'Đăng xuất' },
                ],
            },
        ],
    },
];

const MenuComponent = ({ mode, selectedKey }) => {
    const navigate = useNavigate();

    const onClick = (e) => {
        console.log('click ', e);
        const { key } = e;
        console.log('Selected Key:', key);

        switch (key) {
            case '1':
                navigate('/homepage');
                break;
            case '4':
                const userId = localStorage.getItem('userId');
                navigate(`/profile/${userId}`);
                break;
            case '2':
                navigate('/ranklist');
                break;
            case '3':
                navigate('/search');
                break;
            case '7':
                navigate(`/group/66968eeff83bb8586cecc558`);
                break;
            case '6':
                navigate(`/login`);
                break;
            case '8':
                navigate(`/search/user`);
                break;
            default:
                break;
        }
    };

    return (
        <Menu
            onClick={onClick}
            style={{ width: mode === 'horizontal' ? '100%' : 256 }}
            selectedKeys={[selectedKey]} // Cập nhật selectedKeys từ props
            defaultOpenKeys={['sub1']}
            mode={mode}
            items={items}
            className="custom-menu"
        />
    );
};

export default MenuComponent;
