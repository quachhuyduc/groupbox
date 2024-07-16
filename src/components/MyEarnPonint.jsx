import React, { useState, useEffect } from 'react';
import { Card, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPoints } from '.././redux/slides/pointSlice';
import { getUser } from '.././api/api';

const MyEarnPoint = ({ userId }) => {
    const dispatch = useDispatch();
    const points = useSelector(state => state.points.points);
    const [user, setUser] = useState(null);
    const [pointsUpdated, setPointsUpdated] = useState(false); // State để theo dõi khi nào đã cập nhật điểm

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUserId = localStorage.getItem('userId');
                if (storedUserId) {
                    const userData = await getUser(storedUserId);
                    setUser(userData.data);
                } else {
                    throw new Error('User ID is not available');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const updateUserPointsInDb = async () => {
            try {
                const newPoints = user.pointday + points;
                await dispatch(updateUserPoints({ userId: user._id, points: newPoints }));
                setUser(prevUser => ({
                    ...prevUser,
                    pointday: newPoints,
                }));
                setPointsUpdated(true); // Đánh dấu đã cập nhật điểm thành công
            } catch (error) {
                console.error('Error updating user points:', error);
            }
        };

        // Chỉ gọi updateUserPointsInDb khi điều kiện thỏa mãn và chưa cập nhật điểm trước đó
        if (points > 0 && user && !pointsUpdated) {
            updateUserPointsInDb();
        }
    }, [points, user, dispatch, pointsUpdated]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <Card.Meta
            avatar={<Avatar src={`http://localhost:5000/${user.avatarUrl}`} />}
            title={user.name}
            description={`Số điểm kiếm được: ${user.pointday}`}
        />
    );
};

export default MyEarnPoint;
