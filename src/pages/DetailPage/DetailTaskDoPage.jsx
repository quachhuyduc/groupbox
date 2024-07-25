import React, { useState, useEffect } from 'react';
import MenuComponent from '../../components/Menu/MenuComponent';
import { useParams } from 'react-router-dom';
import './DetailPage.css'; // Import the CSS file
import { Card, Spin } from 'antd';
import CommentList from '../../components/Comment/CommentList';
import MyComment from '../../components/Comment/MyComment';
import { getTaskById, getUser, getCommentsByTaskId } from '../../api/api';
import QuestionTask from './QuestionTask';
import ReactPlayer from 'react-player';


const DetailTaskDoPage = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [comments, setComments] = useState([]);
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


        fetchUserData();
        fetchTask();
        fetchComments();
    }, [taskId]);
    const fetchComments = async () => {
        try {
            const response = await getCommentsByTaskId(taskId);
            setComments(response); // Cập nhật danh sách bình luận
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };


    if (!task || !currentUser) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <div>Đang tải...</div>
            </div>
        );
    }

    const addComment = async (comment) => {
        try {
            setComments([comment, ...comments]);
            await fetchComments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }

    };
    const isVideoOrAudio = (url) => {
        return url && (url.endsWith('.mp4') || url.endsWith('.mp3'));
    };
    const isImage = (url) => {
        return url && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif'));
    };
    const getPlayerHeight = (url) => {
        if (url.endsWith('.mp4')) {
            return '50%'; // Chiều cao cho video
        }
        if (url.endsWith('.mp3')) {
            return '50px'; // Chiều cao cho audio
        }
        return '200px'; // Chiều cao mặc định
    };

    return (
        <div className="home-page-container">
            <MenuComponent mode="inline" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Card style={{ backgroundColor: "rgb(88, 204, 2)", width: '1200px', marginLeft: "100px", marginTop: '20px' }}>
                    <div style={{ fontSize: '22px', lineHeight: "28px", fontStyle: "normal", fontWeight: "700", color: "white", textAlign: 'center', flex: 1 }}> {task.data.nameTask}</div>
                    <div style={{ fontSize: '22px', lineHeight: "28px", fontStyle: "normal", fontWeight: "700", color: "white", textAlign: 'center', flex: 1 }}>  {task.data.requirements}</div>
                </Card>
                <Card style={{ width: '1200px', marginLeft: "100px", textAlign: 'center', fontWeight: "500", color: "black" }}>
                    <div>
                        {isVideoOrAudio(task.data.contentTask) ? (
                            <ReactPlayer
                                url={task.data.contentTask}
                                controls
                                width="100%"
                                height={getPlayerHeight(task.data.contentTask)}
                            />
                        ) : isImage(task.data.contentTask) ? (
                            <img
                                src={task.data.contentTask}
                                alt="Task content"
                                style={{ width: '100%', maxHeight: '500px' }}
                            />
                        ) : (
                            <p>{task.data.contentTask}</p>
                        )}
                    </div>
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
