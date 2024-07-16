import React from 'react';
import { Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const SearchTaskListComponent = ({ title, data, current, pageSize }) => {
    const navigate = useNavigate();

    // Kiểm tra data và xử lý khi không có dữ liệu
    if (!data || data.length === 0) {
        return (
            <div>
                <h2>{title}</h2>
                <p>Không có dữ liệu để hiển thị.</p>
            </div>
        );
    }

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);

    return (
        <>
            <h2>{title}</h2>
            <Card style={{ border: '2px solid #58CC02' }}>
                <Row gutter={24} justify="center">
                    {currentData.map((card, index) => (
                        <Col key={index} span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card
                                // title={card.title}
                                style={{
                                    minHeight: '150px',
                                    width: '100%',
                                    maxWidth: '200px',
                                    border: '2px solid #58CC02',
                                    // backgroundColor: card.color,
                                }}
                            >
                                {/* {card.content} */}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>
        </>
    );
}

export default SearchTaskListComponent;
