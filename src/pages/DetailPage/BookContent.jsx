import React from 'react';
import { Collapse } from 'antd';

import 'react-h5-audio-player/lib/styles.css'; // Import CSS for the audio player


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


const items = [
    {
        key: '1',
        label: 'Chương 2 : Ô tô bay',
        children: (
            <div>
                <p>{text}</p>

            </div>
        ),
    },
];

const BookContent = () => {
    const onChange = (key) => {
        console.log(key);
    };

    return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default BookContent;
