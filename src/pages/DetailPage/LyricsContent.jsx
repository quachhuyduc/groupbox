import React, { useState, useEffect } from 'react';
import { Collapse, Radio, Button } from 'antd';
import AudioPlayer from 'react-h5-audio-player';
import { useDispatch } from 'react-redux';
import { addPoints } from '../../redux/slides/pointSlice';
import 'react-h5-audio-player/lib/styles.css';
import music from '../../asset/music.mp3';
import { getTaskByName } from '../../api/api';

const LyricsContent = () => {
    const dispatch = useDispatch();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTaskByName('Example Task');  // Thay taskName bằng name cần lấy
                console.log("response", response);
                setTask(response.data);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        fetchTask();
    }, []);

    const handleOptionChange = (questionKey, option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionKey]: option,
        });
    };

    const handleSubmit = () => {
        let score = 0;
        task?.questions?.forEach((question) => {
            if (selectedAnswers[question._id] === question.correctAnswer) {
                score += question.points;
            }
        });
        dispatch(addPoints(score));
        setSubmitted(true);
    };

    if (!task) {
        return <p>Loading...</p>;
    }

    const items = [
        {
            key: '1',
            label: `Chương 2 : ${task?.nameTask}`,
            children: (
                <div>
                    <p>{task?.contentTask}</p>
                    <AudioPlayer
                        src={music}
                        onPlay={e => console.log("onPlay")}
                    />
                    {task?.questions?.length > 0 ? task.questions.map((q) => (
                        <div key={q._id} style={{ marginTop: '20px' }}>
                            <p>{q.question}</p>
                            <Radio.Group
                                style={{ display: 'flex', flexDirection: 'column' }}
                                onChange={(e) => handleOptionChange(q._id, e.target.value)}
                                value={selectedAnswers[q._id]}
                                disabled={submitted}
                            >
                                {q.answers.map((option, index) => (
                                    <Radio
                                        key={index}
                                        value={option}
                                        style={{
                                            color: submitted && option === q.correctAnswer ? 'red' : 'inherit',
                                        }}
                                    >
                                        {option}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                    )) : <p>(Không có câu hỏi nào)</p>}
                    {!submitted && (
                        <Button type="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                            Submit
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    const onChange = (key) => {
        console.log(key);
    };

    return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default LyricsContent;
