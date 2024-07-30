
import axios from 'axios';

const API_URL_USER = 'http://localhost:5000/api/user';
const API_URL_TASK = 'http://localhost:5000/api/task';
const API_URL_GROUP = 'http://localhost:5000/api/group';
const API_URL_COMMENT = 'http://localhost:5000/api/comment';
const API_URL_TOPIC = 'http://localhost:5000/api/topic';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/user/login', {
            email,
            password
        });
        if (response.data.status === 'OK') {
            localStorage.setItem('userId', response.data._id); // Lưu userId vào localStorage
        }

        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const getUser = async (userId) => {
    try {

        const response = await axios.get(`${API_URL_USER}/${userId}`);
        if (response.data.status === 'OK') {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error('Không thể lấy thông tin người dùng');
    }
};

export const updateUser = async (userId, updateData) => {
    try {
        const response = await axios.put(`${API_URL_USER}/${userId}`, updateData);
        if (response.data.status === 'OK') {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error('Không thể cập nhật thông tin người dùng');
    }
};

export const updateUserAvatar = async (userId, formData) => {
    try {
        const response = await axios.post(`${API_URL_USER}/${userId}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.data.status === 'OK') {
            return response.data;
        } else {
            throw new Error(response.data.message || 'Update avatar failed');
        }
    } catch (error) {
        throw new Error('Không thể cập nhật avatar');
    }
};

export const getUserList = async () => {
    try {
        const response = await axios.get(`${API_URL_USER}/listUsers`);
        if (response.data.status === 'OK') {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error('Không thể lấy danh sách người dùng');
    }
};
export const getTaskList = async () => {
    try {
        const response = await axios.get(`${API_URL_TASK}/listTasks`);
        if (response.data.status === 'OK') {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error('Không thể lấy task');
    }
};
export const getTaskByName = async (taskName) => {
    try {
        const response = await axios.get(`${API_URL_TASK}/tasks/${taskName}`);
        if (response.data.status === 'OK') {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error('Không thể lấy task');
    }
};
export const getTaskById = async (taskId) => {
    try {
        const response = await axios.get(`${API_URL_TASK}/${taskId}`);
        if (response.data.status === 'OK') {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error('Không thể lấy task');
    }
};

export const getGroupForMember = async (groupId, userId) => {
    try {
        const response = await axios.post(`${API_URL_GROUP}/${groupId}/member-info`, { userId });
        if (response.data.status === 'OK') {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error('Không thể lấy thông tin nhóm');
    }
};

export const searchTask = async (partialName) => {
    try {
        const response = await axios.get(`${API_URL_TASK}/search/${partialName}`);
        if (response.data.status === 'OK') {
            return response.data; // Trả về dữ liệu nếu thành công
        } else {
            throw new Error(response.data.message); // Xử lý lỗi nếu có lỗi từ backend
        }
    } catch (error) {
        throw new Error('Không thể lấy danh sách nhiệm vụ.'); // Xử lý lỗi nếu có lỗi trong quá trình gọi API
    }
};
export const addTaskToList = async (userId, taskId) => {
    try {
        const response = await axios.post(`${API_URL_TASK}/add`, { userId, taskId });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to add task to list');
        }
    } catch (error) {
        console.error('Error adding task to list:', error.message);
        throw error; // Ném lại lỗi để xử lý ở nơi gọi
    }
};
export const getUserTasks = async (userId) => {
    try {
        const response = await axios.get(`${API_URL_TASK}/userTasks/${userId}`);
        if (response.data.status === 'OK') {
            return response.data.data; // Dữ liệu nhiệm vụ của người dùng
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        throw new Error('Unable to fetch user tasks');
    }
};
export const updateUserPoints = async (userId, points) => {
    try {
        const response = await axios.patch(`${API_URL_USER}/updatePoints`, {
            userId,
            points,
        });
        return response.data;
    } catch (error) {
        throw new Error('Lỗi khi cập nhật điểm: ' + error.message);
    }
};

export const createComment = async (commentData) => {
    try {
        const response = await axios.post(`${API_URL_COMMENT}/addComments`, commentData);
        if (response.data.status === 'OK') {
            return response.data;
        } else {
            throw new Error(response.data.message || 'Failed to create comment');
        }
    } catch (error) {
        console.error('Error creating comment:', error.response ? error.response.data : error.message);
        throw new Error('Không thể tạo comment');
    }
};

export const getCommentsByTaskId = async (taskId) => {
    try {
        const response = await axios.get(`${API_URL_COMMENT}/task/${taskId}`);
        // Log dữ liệu bình luận để kiểm tra thông tin người dùng
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw new Error('Error fetching comments');
    }
};
export const getCommentsByGroupId = async (groupId) => {
    try {
        const response = await axios.get(`${API_URL_COMMENT}/group/${groupId}`);
        // Log dữ liệu bình luận để kiểm tra thông tin người dùng
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw new Error('Error fetching comments');
    }
};
export const searchUserByName = async (partialName) => {
    try {
        const response = await axios.get(`${API_URL_USER}/search/${partialName}`);
        if (response.data.status === 'OK') {
            return response.data; // Trả về dữ liệu nếu thành công
        } else {
            throw new Error(response.data.message); // Xử lý lỗi nếu có lỗi từ backend
        }
    } catch (error) {
        throw new Error('Không thể tìm kiếm người dùng.'); // Xử lý lỗi nếu có lỗi trong quá trình gọi API
    }
};
export const addMemberToGroup = async (groupId, userId) => {
    try {
        const response = await axios.post(`${API_URL_GROUP}/add-member`, {
            groupId,
            userId
        });

        if (response.data.status === 'OK') {
            return response.data; // Trả về dữ liệu nếu thành công
        } else {
            throw new Error(response.data.message || 'Failed to add member to group'); // Xử lý lỗi nếu có lỗi từ backend
        }
    } catch (error) {
        console.error('Error adding member to group:', error.response ? error.response.data : error.message);
        throw new Error('Không thể thêm thành viên vào nhóm'); // Xử lý lỗi nếu có lỗi trong quá trình gọi API
    }
};
export const getMemberList = async (groupId) => {
    try {
        const response = await axios.get(`${API_URL_GROUP}/${groupId}/members`);
        return response.data.members; // Đảm bảo trả về danh sách thành viên
    } catch (error) {
        console.error('Lỗi khi lấy danh sách thành viên:', error);
        throw error;
    }
};
export const removeMemberFromGroup = async (groupId, userId) => {
    try {


        const response = await axios.post(`${API_URL_GROUP}/remove-member`, {
            groupId,
            userId,
        });

        if (response.data.status === 'OK') {
            return response.data; // Trả về dữ liệu nếu thành công
        } else {
            throw new Error(response.data.message || 'Failed to remove member from group'); // Xử lý lỗi nếu có lỗi từ backend
        }
    } catch (error) {
        console.error('Error removing member from group:', error.response ? error.response.data : error.message);
        throw new Error('Không thể xóa thành viên khỏi nhóm'); // Xử lý lỗi nếu có lỗi trong quá trình gọi API
    }
};
export const getTasksByCategory = async (taskCategory) => {
    try {
        const response = await axios.get(`${API_URL_TASK}/category/${taskCategory}`);
        if (response.data.status === 'OK') {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error('Không thể lấy task');
    }
};
export const getTopics = async () => {
    try {
        const response = await axios.get(`${API_URL_TOPIC}/listTopics`);
        // Điều chỉnh theo cấu trúc dữ liệu thực tế từ API
        if (Array.isArray(response.data)) {
            return response.data; // Trả về mảng các chủ đề
        } else {
            throw new Error("Dữ liệu không hợp lệ");
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu topics:", error);
        throw new Error('Không thể lấy dữ liệu chủ đề');
    }
};


export const getTasksByTopic = async (topicId) => {
    try {
        // Gọi API để lấy danh sách các nhiệm vụ của chủ đề
        const response = await axios.get(`${API_URL_TOPIC}/topics/${topicId}/tasks`);

        // Kiểm tra trạng thái của phản hồi
        if (response.data.status === 'OK') {
            return response.data; // Trả về toàn bộ dữ liệu, vì bạn đang sử dụng response.data.tasks
        } else {
            throw new Error(response.data.message); // Ném lỗi nếu có thông báo lỗi từ server
        }
    } catch (error) {
        throw new Error('Unable to fetch tasks by topicId: ' + error.message); // Thêm thông tin lỗi vào thông báo
    }
};
