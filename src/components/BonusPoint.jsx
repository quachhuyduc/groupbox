import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const BonusPoint = ({ criteria, avatarUrl, name }) => {
    return (
        <div style={{ padding: 16 }}>
            <h3 style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Bonus Point</h3>
            {criteria.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: 0, flex: 1 }}>{item.description}</p>
                    <Card style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '110px', marginTop: '10px', backgroundColor: "rgb(88, 204, 2)" }}>
                        {item.points} Điểm
                    </Card>
                </div>
            ))}
            <h3 style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: "20px" }}>Congratulation!!</h3>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 16, justifyContent: 'center' }}>
                <Avatar src={avatarUrl} size={64} icon={!avatarUrl && <UserOutlined />} />
            </div>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
                <div>{name}</div>
                <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Đã giành được bonus Point</div>
            </div>
        </div>
    );
};

export default BonusPoint;
