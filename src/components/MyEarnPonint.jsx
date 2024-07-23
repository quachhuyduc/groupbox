import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUserPoints, resetPoints } from '.././redux/slides/pointSlice';
// import { getUser } from '.././api/api';

const MyEarnPoint = () => {
    const dispatch = useDispatch();
    const points = useSelector(state => state.points.points);
    const [currentPoints, setCurrentPoints] = useState(0);

    useEffect(() => {
        const updateUserPointsInDb = async () => {
            try {
                const storedUserId = localStorage.getItem('userId');
                if (storedUserId) {
                    // Debug log để kiểm tra điểm trước khi gửi yêu cầu
                    console.log(`Updating points in database. User ID: ${storedUserId}, Points to Add: ${points}`);

                    await dispatch(updateUserPoints({ userId: storedUserId, points: points }));
                    console.log("Dispatched updateUserPoints with points:", points);
                    setCurrentPoints(prevPoints => prevPoints + points); // Cập nhật điểm trong giao diện
                    dispatch(resetPoints()); // Reset điểm trong Redux
                }
            } catch (error) {
                console.error('Error updating user points:', error);
            }
        };

        if (points > 0) {
            updateUserPointsInDb();
        }
    }, [points, dispatch]);



    return (
        <div style={{ width: '300px', textAlign: 'center' }}>
            <h3>Số điểm kiếm được: {currentPoints}</h3>
        </div>
    );
};

export default MyEarnPoint;
