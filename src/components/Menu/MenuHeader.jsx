import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
    {
        label: (
            <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                Navigation One
            </span>
        ),
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: (
            <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                Navigation Two
            </span>
        ),
        key: 'app',
        icon: <AppstoreOutlined />,
    },
    {
        label: (
            <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                Navigation Three
            </span>
        ),
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
    {
        key: 'mail',
        icon: <MailOutlined />,
        label: (
            <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                Navigation Four
            </span>
        ),
    },
];

const MenuHeader = () => {
    const [current, setCurrent] = useState('mail');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{ backgroundColor: 'transparent', border: 'none' }} // Xóa màu nền và đường viền
        />
    );
};

export default MenuHeader;
