
import axios from 'axios';

const API_URL_USER = 'http://localhost:5000/api/user';
const API_URL_TASK = 'http://localhost:5000/api/task';

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
            console.log("getUsser", response.data);
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
        const response = await axios.put(`${API_URL_USER}/update/${userId}`, updateData);
        console.log("updateUser response", response);
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
        console.log("response", response);
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
        console.log("response", response);
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
        console.log("response", response);
        if (response.data.status === 'OK') {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error('Không thể lấy task');
    }
};