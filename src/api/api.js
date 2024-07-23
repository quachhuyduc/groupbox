
import axios from 'axios';

const API_URL_USER = 'http://localhost:5000/api/user';
const API_URL_TASK = 'http://localhost:5000/api/task';
const API_URL_GROUP = 'http://localhost:5000/api/group';
const API_URL_COMMENT = 'http://localhost:5000/api/comment';

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
export const getGroupkById = async (groupId) => {

    try {
        const response = await axios.get(`${API_URL_GROUP}/${groupId}`);
        console.log("response", groupId);
        if (response.data.status === 'OK') {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error('Không thể lấy task');
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
        console.log('Get comments response:', response);
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
