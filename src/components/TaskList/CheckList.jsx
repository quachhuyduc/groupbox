// src/components/TaskList/CheckList.js
import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTaskCompletion } from '../../redux/slides/taskSlice';

const CheckList = ({ taskId }) => {
    const dispatch = useDispatch();
    const completed = useSelector(state => state.tasks.tasks.find(task => task.id === taskId).completed);

    const toggleCompletion = () => {
        dispatch(toggleTaskCompletion(taskId));
    };

    return (
        <div
            onClick={toggleCompletion}
            style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: '2px solid #ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                marginLeft: '10px',
                backgroundColor: completed ? '#58CC02' : 'transparent',
            }}
        >
            {completed && <CheckOutlined style={{ fontSize: '18px', color: '#fff' }} />}
        </div>
    );
};

export default CheckList;
