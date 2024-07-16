import React, { useEffect, useState } from 'react';
import { Input, Card, Row, Col, Modal } from 'antd';
import MenuComponent from '../../components/Menu/MenuComponent';
import { getTaskList, getTaskDetail, getTaskById } from '../../api/api'; // Import hàm getTaskDetail từ API

const { Search } = Input;

const SearchPage = () => {
    // const { taskId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null); // State để lưu trữ thông tin chi tiết nhiệm vụ
    // State để quản lý trạng thái loading khi gọi API

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTaskList();
                const tasksData = response.data; // Lấy mảng tasks từ dữ liệu phản hồi
                setTasks(tasksData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const onSearch = value => console.log(value);

    // Xử lý khi click vào Card để lấy thông tin chi tiết nhiệm vụ
    const handleCardClick = async taskId => {
        try {
            const response = await getTaskById(taskId); // Gọi API để lấy chi tiết nhiệm vụ dựa trên taskId
            const taskDetail = response.data;
            console.log("taskdetail", response.data);// Lấy dữ liệu chi tiết nhiệm vụ từ phản hồi
            setSelectedTask(taskDetail); // Lưu thông tin chi tiết nhiệm vụ vào state để hiển thị
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết nhiệm vụ:', error);
        }
    };

    // Render danh sách nhiệm vụ
    const renderTasks = () => {
        return tasks.map(task => (
            <Card
                key={task._id} // Sử dụng _id của task làm key (giả sử _id là trường định danh duy nhất trong dữ liệu task)
                style={{ margin: '16px 0', border: '1px solid #e8e8e8', cursor: 'pointer' }}
                onClick={() => handleCardClick(task._id)} // Xử lý khi click vào Card
            >
                <h3 style={{ marginBottom: '12px' }}>{task.nameTask}</h3>
            </Card>
        ));
    };

    return (
        <div className="home-page-container" style={{ display: 'flex' }}>
            <MenuComponent mode="inline" />
            <div style={{ flex: 1, padding: '20px' }}>
                <Search
                    placeholder="Nhập từ khóa tìm kiếm"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={onSearch}
                    style={{ width: '80%' }}
                />
                <h2>Danh sách nhiệm vụ</h2>
                {tasks.length === 0 && <div>Loading...</div>}
                {renderTasks()}
                {/* Modal hiển thị thông tin chi tiết nhiệm vụ */}
                <Modal
                    title={selectedTask ? selectedTask.nameTask : 'Chi tiết nhiệm vụ'}
                    visible={selectedTask !== null}
                    onCancel={() => setSelectedTask(null)}
                    footer={null}
                >
                    {selectedTask && (
                        <div>
                            <p>Level: {selectedTask.level}</p>
                            <p>Total Points: {selectedTask.totalPoints}</p>
                            <p>Detail: {selectedTask.detail}</p>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}

export default SearchPage;
