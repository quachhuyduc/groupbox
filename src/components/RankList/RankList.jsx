import React, { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import { getUserList } from '../../api/api.js'; // Giả sử bạn có một hàm API để lấy tất cả người dùng

const RankList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu người dùng từ API
        const fetchUsers = async () => {
            try {
                const response = await getUserList();
                const usersData = response.data; // Lấy mảng người dùng từ dữ liệu phản hồi

                setUsers(usersData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <List
                dataSource={users}
                renderItem={(user, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`http://localhost:5000/${user.avatarUrl}`} />} // Đường dẫn đến avatar từ API
                            title={`Tên: ${user?.name}`}
                            description={`Điểm Ngày: ${user?.pointday}`}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default RankList;
