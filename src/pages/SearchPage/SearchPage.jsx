import React, { useEffect, useState } from "react";
import { Input, message, Button, Spin, List } from "antd";
import { useNavigate } from 'react-router-dom';
import MenuComponent from "../../components/Menu/MenuComponent";
import { getTopics, getTasksByTopic, getTaskById, getTaskList } from "../../api/api";

const { Search } = Input;

const SearchPage = () => {
    const [initialTasks, setInitialTasks] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const topicsResponse = await getTopics();
                if (topicsResponse && Array.isArray(topicsResponse) && topicsResponse.length > 0) {
                    setTopics(topicsResponse);

                    // Nếu có ít nhất một chủ đề, chọn chủ đề đầu tiên
                    setSelectedTopic(topicsResponse[0]._id);
                } else {
                    throw new Error("Dữ liệu chủ đề không hợp lệ hoặc trống");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu chủ đề:", error.message);
                message.error("Không thể lấy dữ liệu chủ đề. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };


        fetchData();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            if (!selectedTopic) return;

            try {
                setLoading(true);
                let response;

                if (selectedTopic) {
                    response = await getTasksByTopic(selectedTopic);
                } else {
                    response = await getTaskList();
                }

                // Kiểm tra cấu trúc dữ liệu nhiệm vụ
                if (response.status === 'OK' && Array.isArray(response.data)) {
                    console.log("Dữ liệu nhiệm vụ:", response.data); // Kiểm tra dữ liệu phản hồi
                    setInitialTasks(response.data);
                    setSuggestions(response.data);
                } else {
                    throw new Error("Dữ liệu nhiệm vụ không hợp lệ");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu nhiệm vụ:", error.message);
                message.error("Không thể lấy dữ liệu nhiệm vụ. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [selectedTopic]);

    const onSearch = (value) => {
        setSearchValue(value);
        if (value.trim() === "") {
            setSuggestions(initialTasks);
            return;
        }
        const filteredTasks = initialTasks.filter((task) =>
            task.nameTask && task.nameTask.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredTasks);
    };

    const handleSearchButtonClick = () => {
        if (searchValue.trim() === "") {
            message.warning("Vui lòng nhập từ khóa tìm kiếm.");
            return;
        }
        const filteredTasks = initialTasks.filter(task =>
            task.nameTask && task.nameTask.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSuggestions(filteredTasks);
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
        <div className="home-page-container" style={{ display: "flex" }}>
            <MenuComponent mode="inline" selectedKey="3" />
            <div style={{ flex: 1, padding: "20px" }}>
                <Search
                    placeholder="Nhập từ khóa tìm kiếm"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    value={searchValue}
                    onChange={(e) => onSearch(e.target.value)}
                    onSearch={handleSearchButtonClick}
                    style={{ width: "80%" }}
                />
                <h2>Danh sách nhiệm vụ</h2>
                {loading && <Spin />}
                {!loading && (
                    <div>
                        <div style={{ marginBottom: "20px" }}>
                            {topics.map(topic => (
                                <Button
                                    key={topic._id}
                                    style={{ marginRight: 10, marginBottom: 10 }}
                                    onClick={() => setSelectedTopic(topic._id)}
                                    type={selectedTopic === topic._id ? "primary" : "default"}
                                >
                                    {topic.name}
                                </Button>
                            ))}
                        </div>
                        <List
                            style={{ width: '80%', marginBottom: "20px" }}
                            bordered
                            dataSource={suggestions}
                            renderItem={item => (
                                <List.Item onClick={() => handleCardClick(item._id)}>
                                    <div>
                                        <h3>{item.nameTask}</h3>
                                    </div>
                                </List.Item>
                            )}
                            locale={{ emptyText: searchValue && suggestions.length === 0 ? "Không có kết quả tìm kiếm phù hợp." : "Không có nhiệm vụ nào" }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
