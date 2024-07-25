import React from 'react';
import { Avatar, List } from 'antd';
import { useSelector } from 'react-redux';

const RankGroupList = () => {
    const { members, status, error } = useSelector((state) => state.members);

    if (status === 'loading') return <p>Đang tải dữ liệu...</p>;
    if (status === 'failed') return <p>Lỗi: {error}</p>;

    // Kiểm tra nếu members là mảng
    if (!Array.isArray(members)) {
        return <p>Dữ liệu không hợp lệ.</p>;
    }

    // Sắp xếp members theo pointday từ cao xuống thấp
    const sortedMembers = [...members].sort((a, b) => b.pointday - a.pointday);

    return (
        <List
            dataSource={sortedMembers}
            renderItem={(member, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={`http://localhost:5000/${member.avatarUrl}`} />}
                        title={`Tên: ${member?.name}`}
                        description={`Điểm Ngày: ${member?.pointday}`}
                    />
                    <div style={{ marginLeft: 'auto' }}>
                        Rank: {index + 1}
                    </div>
                </List.Item>
            )}
        />
    );
};

export default RankGroupList;
