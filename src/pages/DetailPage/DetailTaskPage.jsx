import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Badge } from 'antd';
import { getTaskById } from '../../api/api';

const DetailTaskPage = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {

            try {
                const response = await getTaskById(taskId);
                console.log(response);
                setTask(response.data);
            } catch (error) {
                console.error('Error fetching the task:', error);
            }
        };

        fetchTask();
    }, [taskId]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <Card title="Chi Tiết Nhiệm Vụ" style={{ width: 600, margin: '0 auto' }}>
            <Descriptions bordered>
                <Descriptions.Item label="Tên Nhiệm Vụ" span={3}>
                    {task.nameTask}
                </Descriptions.Item>
                <Descriptions.Item label="Nội Dung Nhiệm Vụ" span={3}>
                    {task.contentTask}
                </Descriptions.Item>
                <Descriptions.Item label="Yêu Cầu Nhiệm Vụ" span={3}>
                    {task.levels.easy.requirements}
                </Descriptions.Item>
                <Descriptions.Item label="Số Điểm Có Thể Nhận" span={1}>
                    {task.levels.easy.totalPoints}
                </Descriptions.Item>
                <Descriptions.Item label="Mức Độ Khó" span={2}>
                    <Badge status="processing" text={task.levels.easy.levelName} />
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
}

export default DetailTaskPage;
