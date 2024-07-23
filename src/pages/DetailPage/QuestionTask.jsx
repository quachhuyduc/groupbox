import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskById } from '../../api/api';
import { useDispatch } from 'react-redux';
import { addPoints, setTaskStatus, updateUserPoints } from '../../redux/slides/pointSlice';

const QuestionTask = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [taskCompleted, setTaskCompleted] = useState(false);
    const { taskId } = useParams();
    const dispatch = useDispatch();

    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage

    useEffect(() => {
        const fetchQuestionsAndAnswers = async () => {
            try {
                const response = await getTaskById(taskId);
                if (response.data && response.data.data.questions) {
                    setQuestions(response.data.data.questions);

                    // Kiểm tra trạng thái nhiệm vụ của người dùng trong Local Storage
                    const storedTaskStatus = JSON.parse(localStorage.getItem(`taskStatus-${userId}-${taskId}`));
                    if (storedTaskStatus) {
                        setTaskCompleted(storedTaskStatus.completed);
                        setResult(storedTaskStatus.points);
                    } else {
                        setTaskCompleted(false);
                        setResult(null);
                    }
                } else {
                    setQuestions([]);
                    setTaskCompleted(false);
                    setResult(null);
                }
            } catch (error) {
                console.error('Lỗi khi lấy câu hỏi và câu trả lời:', error);
                setQuestions([]);
                setTaskCompleted(false);
                setResult(null);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestionsAndAnswers();
    }, [taskId, userId]);

    const handleAnswerChange = (questionIndex, answer) => {
        if (!taskCompleted) {
            setSelectedAnswers((prev) => ({
                ...prev,
                [questionIndex]: answer,
            }));
        }
    };

    const handleSubmit = () => {
        if (taskCompleted) return;

        let totalPoints = 0;
        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                totalPoints += question.points;
            }
        });

        console.log('Total Points:', totalPoints); // Log tổng điểm

        setResult(totalPoints > 0 ? `Bạn đã nhận ${totalPoints} điểm!` : 'Bạn đã trả lời sai. Không có điểm.');
        setTaskCompleted(true);

        // Lưu trạng thái vào Local Storage theo userId
        localStorage.setItem(`taskStatus-${userId}-${taskId}`, JSON.stringify({ completed: true, points: totalPoints }));

        // Dispatch action để cập nhật điểm trong Redux và lưu trạng thái nhiệm vụ
        dispatch(addPoints(totalPoints)); // Cập nhật tổng điểm
        console.log("sssss", totalPoints);
        dispatch(setTaskStatus({ taskId, status: true, points: totalPoints }));

        // Cập nhật điểm vào cơ sở dữ liệu
        if (userId) {
            dispatch(updateUserPoints({ userId, points: totalPoints }));
        }
    };

    if (loading) {
        return <div>Đang tải câu hỏi...</div>;
    }

    return (
        <div>
            {questions.length > 0 ? (
                <div>
                    {questions.map((question, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <div style={{ fontWeight: 'bold' }}>{question.question}</div>
                            {question.answers.map((answer, idx) => (
                                <div key={idx} style={{ marginLeft: '20px' }}>
                                    <input
                                        type="radio"
                                        id={`question-${index}-answer-${idx}`}
                                        name={`question-${index}`}
                                        value={answer}
                                        checked={selectedAnswers[index] === answer}
                                        onChange={() => handleAnswerChange(index, answer)}
                                        disabled={taskCompleted} // Disable when task is completed
                                    />
                                    <label htmlFor={`question-${index}-answer-${idx}`}>
                                        {answer}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={handleSubmit} disabled={taskCompleted}>Gửi đáp án</button>
                    {taskCompleted && (
                        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                            Bạn đã hoàn thành nhiệm vụ này! Số điểm đã kiếm được: {result}
                        </div>
                    )}
                </div>
            ) : (
                <div>Không có câu hỏi nào.</div>
            )}
        </div>
    );
};

export default QuestionTask;
