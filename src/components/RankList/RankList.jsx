import React, { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import { getUserList } from '../../api/api.js';

const RankList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUserList();
                const usersData = response.data;
                const sortedUsers = usersData.sort((a, b) => b.pointday - a.pointday);
                setUsers(sortedUsers);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <List
            dataSource={users}
            renderItem={(user, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={`http://localhost:5000/${user.avatarUrl}`} />}
                        title={`Tên: ${user?.name}`}
                        description={`Điểm Ngày: ${user?.pointday}`}
                    />
                    <div style={{ marginLeft: 'auto' }}>
                        Rank: {index + 1}
                    </div>
                </List.Item>
            )}
        />
    );
};

export default RankList;
