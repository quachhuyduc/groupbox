import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';

const CheckList = () => {
    const [completed, setCompleted] = useState(false);

    const toggleCompletion = () => {
        setCompleted(!completed);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>

            <div
                onClick={toggleCompletion}
                style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%', // Đảm bảo hình tròn
                    border: '2px solid #ccc', // Viền cho checkbox
                    display: 'flex',
                    justifyContent: 'center', // Căn giữa theo chiều ngang
                    alignItems: 'center', // Căn giữa theo chiều dọc
                    cursor: 'pointer',
                    marginLeft: '10px',
                    backgroundColor: completed ? '#58CC02' : 'transparent', // Màu nền khi được chọn
                }}
            >
                {completed && <CheckOutlined style={{ fontSize: '18px', color: '#fff' }} />} {/* Icon tick */}
            </div>
        </div>
    );
};

export default CheckList;
