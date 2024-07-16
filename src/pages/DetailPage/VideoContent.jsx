import React from 'react';
import { Collapse, Radio } from 'antd';
import ReactPlayer from 'react-player'; // Thêm react-player
import sampleVideo from '../../asset/sampleVideo.mp4';
const text = `  
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.`;

// const sampleVideo  = 'https://www.example.com/sample.mp4'; // URL của video

const questions = [
    {
        key: 'q1',
        question: 'Câu hỏi 1: Ô tô bay có thể bay cao bao nhiêu mét?',
        options: [
            'Dưới 100 mét',
            'Từ 100 đến 500 mét',
            'Trên 500 mét',
        ],
    },
    {
        key: 'q2',
        question: 'Câu hỏi 2: Ô tô bay sử dụng loại nhiên liệu nào?',
        options: [
            'Xăng',
            'Điện',
            'Năng lượng mặt trời',
        ],
    },
];

const items = [
    {
        key: '1',
        label: 'Chương 2 : Ô tô bay',
        children: (
            <div>
                <p>{text}</p>
                <ReactPlayer url={sampleVideo} controls width="100%" />
                {questions.map((q) => (
                    <div key={q.key} style={{ marginTop: '20px' }}>
                        <p>{q.question}</p>
                        <Radio.Group>
                            {q.options.map((option, index) => (
                                <Radio key={index} value={option}>
                                    {option}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </div>
                ))}
            </div>
        ),
    },
];

const VideoContent = () => {
    const onChange = (key) => {
        console.log(key);
    };
    return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default VideoContent;
