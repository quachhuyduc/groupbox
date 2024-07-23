// src/components/TaskList.js
import React, { useEffect } from 'react';
import { ReadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Card, List } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks } from '../../redux/slides/taskSlice';
import { getUserTasks, getTaskById } from '../../api/api.js'; // Import hàm getTaskList từ api

const TaskList = () => {
    const navigate = useNavigate();
    const tasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();
    console.log("tasks", tasks);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const fetchTasks = async () => {
            try {
                const data = await getUserTasks(userId);
                dispatch(setTasks(data));
            } catch (error) {
                console.error('Failed to fetch tasks:', error.message);
            }
        };

        fetchTasks();
    }, [dispatch]);
    const handleDetailTaskClick = async (taskId) => {
        try {
            const response = await getTaskById(taskId);
            console.log('response', response);
            const taskDetail = response.data;
            navigate(`/detail/dotask/${taskDetail.data._id}`);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết nhiệm vụ:', error);
        }
    };

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{ pageSize: 3 }}
            dataSource={tasks}
            renderItem={(task) => (
                <List.Item
                    key={task.id}
                    extra={
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button style={{ backgroundColor: "rgb(88, 204, 2)", height: '35px', padding: '0 10px' }} onClick={() => handleDetailTaskClick(task._id)}>
                                    <ReadOutlined style={{ fontSize: '18px', color: "white", marginRight: '4px' }} />
                                    <span style={{ fontSize: '18px', fontWeight: "500", color: "white" }}>Chi tiết</span>
                                </Button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: "10px" }}>
                                <Card style={{ backgroundColor: "rgb(88, 204, 2)", height: '35px', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                                        {task.totalPoints} Point
                                    </span>
                                </Card>
                            </div>
                        </div>
                    }
                >
                    <List.Item.Meta
                        title={<a href={task.href} style={{ fontSize: '20px', fontWeight: 'bold' }}>{task.nameTask}</a>}
                        description={task.contentTask}
                    />
                </List.Item>
            )}
        />
    );
};

export default TaskList;
