import React from 'react';
import { Avatar, List, Button } from 'antd';
import { useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
const InformationMember = () => {
    const { members, status, error } = useSelector((state) => state.members);

    if (status === 'loading') return <p>Đang tải dữ liệu...</p>;
    if (status === 'failed') return <p>Lỗi: {error}</p>;

    // Kiểm tra nếu members là mảng
    if (!Array.isArray(members)) {
        return <p>Dữ liệu không hợp lệ.</p>;
    }


    return (
        <>
            <h1 style={{ textAlign: 'center', fontSize: '20px' }}>Thành viên</h1>
            <List
                dataSource={members}
                renderItem={(member, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`http://localhost:5000/${member.avatarUrl}`} />}
                            title={`Tên: ${member?.name}`}
                            description={`Điểm Ngày: ${member?.pointday}`}
                        />
                        <div style={{ marginLeft: 'auto' }}>
                            <Button

                                type="text"
                                icon={<DeleteOutlined />}

                            />
                        </div>
                    </List.Item>
                )}
            />
        </>
    );
};

export default InformationMember;
