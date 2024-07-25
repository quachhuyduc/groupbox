import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Descriptions, Badge, Row, Col, Spin, Button, message } from 'antd';
import { getTaskById, addTaskToList } from '../../api/api';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/slides/taskSlice'; // Import action
import './DetailPage.css'; // Import file CSS của bạn

const DetailTaskPage = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [visible, setVisible] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // Hiển thị nút sau 0.5 giây
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Lấy dữ liệu nhiệm vụ từ backend
        const fetchTask = async () => {
            try {
                const response = await getTaskById(taskId);
                setTask(response.data);

                // Thay đổi trạng thái hiển thị sau 5 giây
                setTimeout(() => {
                    setVisible(true);
                }, 500); // 500 milliseconds = 0.5 giây

            } catch (error) {
                console.error('Lỗi khi lấy nhiệm vụ:', error);
            }
        };

        fetchTask();
    }, [taskId]);

    // Hàm thêm nhiệm vụ vào danh sách
    const addToTaskList = async () => {
        const userId = localStorage.getItem('userId');
        try {
            await addTaskToList(userId, taskId); // Gửi yêu cầu đến backend
            dispatch(addTask(task)); // Thêm nhiệm vụ vào Redux store
            message.success('Đã thêm vào danh sách nhiệm vụ làm!');
        } catch (error) {
            message.error('Không thể thêm vào danh sách nhiệm vụ.');
        }
    };


    // Hiển thị spinner khi chưa có dữ liệu
    if (!task) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <div>Đang tải...</div>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', background: '#f0f2f5', minHeight: '100vh' }}>
            <Row justify="center">
                <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                    <div className={`card-container ${visible ? 'visible' : ''}`}>
                        <Card
                            title="Chi Tiết Nhiệm Vụ"
                            bordered={false}
                            style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                        >
                            <Descriptions bordered layout="vertical" column={1}>
                                <Descriptions.Item label="Tên Nhiệm Vụ">
                                    {task.data.nameTask}
                                </Descriptions.Item>
                                <Descriptions.Item label="Yêu Cầu Nhiệm Vụ">
                                    {task.data.requirements}
                                </Descriptions.Item>
                                <Descriptions.Item label="Số Điểm Có Thể Nhận">
                                    {task.data.totalPoints}
                                </Descriptions.Item>
                                <Descriptions.Item label="Mức Độ Khó">
                                    <Badge status="processing" text={task.data.difficulty} />
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </div>
                </Col>
            </Row>
            <div className={`button-container ${showButton ? 'slideDown' : ''}`}>
                <Button type="primary" style={{ height: '60px', width: '300px', fontSize: '18px' }} onClick={addToTaskList}>
                    Thêm vào danh sách nhiệm vụ làm
                </Button>
            </div>

            <Link to="/search" style={{ position: 'fixed', top: '20px', left: '20px' }}>
                <Button type="primary">Trở về</Button>
            </Link>
        </div>
    );
}

export default DetailTaskPage;
