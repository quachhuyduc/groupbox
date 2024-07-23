import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Card, List, message } from 'antd';
import MenuComponent from '../../components/Menu/MenuComponent';
import { getTaskList, getTaskById, searchTask } from '../../api/api';

const { Search } = Input;

const SearchPage = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [initialTasks, setInitialTasks] = useState([]); // Danh sách ban đầu
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await getTaskList();
                const tasksData = response.data;
                setTasks(tasksData);
                setInitialTasks(tasksData); // Lưu danh sách ban đầu
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Lỗi khi lấy dữ liệu tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const onSearch = async value => {
        setSearchValue(value);
        if (value.trim() === '') {
            setSuggestions([]);
            setTasks(initialTasks); // Khôi phục danh sách ban đầu khi xóa chữ cái
            return;
        }
        // Tự động gợi ý khi gõ từng chữ
        const filteredTasks = initialTasks.filter(task =>
            task.nameTask.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filteredTasks);
    };

    const handleSearchButtonClick = async () => {
        if (searchValue.trim() === '') {
            message.warning('Vui lòng nhập từ khóa tìm kiếm.');
            return;
        }
        try {
            setLoading(true);
            const response = await searchTask(searchValue); // Gọi hàm searchTask từ api.js
            const filteredTasks = response.data;
            setTasks(filteredTasks); // Cập nhật danh sách nhiệm vụ từ kết quả tìm kiếm
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Lỗi khi tìm kiếm nhiệm vụ:', error);
        }
    };

    const handleCardClick = async (taskId) => {
        try {
            const response = await getTaskById(taskId);
            const taskDetail = response.data;
            navigate(`/detail/task/${taskDetail.data._id}`);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết nhiệm vụ:', error);
        }
    };

    return (
        <div className="home-page-container" style={{ display: 'flex' }}>
            <MenuComponent mode="inline" selectedKey="3" />
            <div style={{ flex: 1, padding: '20px' }}>
                <Search
                    placeholder="Nhập từ khóa tìm kiếm"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    value={searchValue}
                    onChange={e => onSearch(e.target.value)}
                    onSearch={handleSearchButtonClick} // Xử lý khi nhấn nút Tìm kiếm
                    style={{ width: '80%' }}
                />
                <h2>Danh sách nhiệm vụ</h2>
                {loading && <div>Loading...</div>}
                {tasks.length > 0 && (
                    <List
                        style={{ width: '80%' }}
                        dataSource={searchValue ? suggestions : tasks}
                        renderItem={task => (
                            <List.Item onClick={() => handleCardClick(task._id)}>
                                <Card style={{ width: '100%', cursor: 'pointer', border: '2px solid #58CC02' }}>
                                    <h3>{task.nameTask}</h3>
                                </Card>
                            </List.Item>
                        )}
                    />
                )}
                {!loading && tasks.length === 0 && (
                    <div>Không có dữ liệu nhiệm vụ.</div>
                )}
                {!loading && searchValue && suggestions.length === 0 && (
                    <div>Không có kết quả tìm kiếm phù hợp.</div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
