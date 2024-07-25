import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
import React, { useEffect } from 'react';
const MyPoint = ({ user, rank }) => {
    const points = useSelector(state => state.points.points); // Tổng điểm từ Redux
    if (!user) {
        return <div>Đang tải...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <Avatar src={`http://localhost:5000/${user.avatarUrl}`} size={64} />
                <div style={{ marginLeft: 16, alignItems: 'center' }}>
                    <h2>{user.name}</h2>
                    <p>Tổng Điểm: {user.pointday}</p> {/* Hiển thị tổng điểm */}
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <h2>Rank: {rank}</h2>
                </div>
            </div>
        </div>
    );
};

export default MyPoint;
