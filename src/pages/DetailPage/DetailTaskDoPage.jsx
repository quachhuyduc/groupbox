import React, { useState, useEffect } from 'react';
import MenuComponent from '../../components/Menu/MenuComponent';
import { useParams } from 'react-router-dom';
import './DetailPage.css'; // Import the CSS file
import { Card, Spin } from 'antd';
import CommentList from '../Comment/CommentList';
import MyComment from '../Comment/MyComment';
import { getTaskById, getUser, getCommentsByTaskId } from '../../api/api';
import QuestionTask from './QuestionTask';

const DetailTaskDoPage = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [comments, setComments] = useState([{
        title: 'Sample Title',
        userName: 'Sample User',
        content: 'Sample Comment',
        avatar: 'https://via.placeholder.com/50',
    }]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTaskById(taskId);
                setTask(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy nhiệm vụ:', error);
            }
        };

        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const userDataResponse = await getUser(userId);
                    const userData = userDataResponse.data;
                    userData.avatarUrl = `http://localhost:5000/${userData.avatarUrl}`;
                    setCurrentUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await getCommentsByTaskId(taskId);
                console.log("taskId", taskId);
                console.log("response", response);
                setComments(response);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchUserData();
        fetchTask();
        fetchComments();
    }, [taskId]);


    if (!task || !currentUser) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <div>Đang tải...</div>
            </div>
        );
    }

    const addComment = (comment) => {
        setComments([comment, ...comments]);
    };

    return (
        <div className="home-page-container">
            <MenuComponent mode="inline" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Card style={{ backgroundColor: "rgb(88, 204, 2)", width: '1200px', marginLeft: "100px", marginTop: '20px' }}>
                    <div style={{ fontSize: '22px', lineHeight: "28px", fontStyle: "normal", fontWeight: "700", color: "white", textAlign: 'center', flex: 1 }}> {task.data.nameTask}</div>
                    <div style={{ fontSize: '22px', lineHeight: "28px", fontStyle: "normal", fontWeight: "700", color: "white", textAlign: 'center', flex: 1 }}>  {task.data.requirements}</div>
                </Card>
                <Card style={{ width: '1200px', marginLeft: "100px", marginTop: '20px', textAlign: 'center', fontWeight: "500", color: "black" }}>
                    {task.data.contentTask}
                </Card>
                <Card style={{ width: '1200px', marginLeft: "100px", marginTop: '20px' }}>
                    <QuestionTask />
                </Card>
                <Card style={{ width: '1200px', marginTop: '30px', marginLeft: "100px" }}>
                    <CommentList comments={comments} />
                </Card>
                <Card style={{ width: '1200px', marginTop: '30px', marginLeft: "100px" }}>
                    <MyComment
                        addComment={addComment}
                        titleName={currentUser.name}
                        avatar={currentUser.avatarUrl} // Sử dụng avatarUrl
                    />
                </Card>
            </div>
        </div>
    );
};

export default DetailTaskDoPage;
