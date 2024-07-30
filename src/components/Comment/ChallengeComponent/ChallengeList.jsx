import React from "react";
import { List, Card, Button, Typography } from "antd";

const { Paragraph } = Typography;

// Dữ liệu cho các thách thức, đã được nhóm theo chủ đề
const challenges = [
    {
        id: 1,
        category: "Thử thách Học Từ Vựng",
        challenges: [
            {
                id: 1,
                title: "Thử thách Học Từ Vựng 7 Ngày",
                description: "Nâng cao vốn từ vựng với 50 từ mới mỗi ngày.",
                duration: "7 ngày",
                reward: "100 điểm, Huy hiệu từ vựng",
                tasks: [
                    { id: 1, title: "Ngày 1: Học 50 từ mới", completed: false },
                    { id: 2, title: "Ngày 2: Ôn tập từ vựng và làm bài kiểm tra", completed: false },
                    { id: 3, title: "Ngày 3: Học 50 từ mới tiếp theo", completed: false },
                    // Thêm nhiệm vụ khác
                ],
            },
            {
                id: 2,
                title: "Thử thách Học Từ Vựng 14 Ngày",
                description: "Nâng cao vốn từ vựng với 50 từ mới mỗi ngày.",
                duration: "14 ngày",
                reward: "200 điểm, Huy hiệu từ vựng",
                tasks: [
                    { id: 1, title: "Ngày 1: Học 50 từ mới", completed: false },
                    { id: 2, title: "Ngày 2: Ôn tập từ vựng và làm bài kiểm tra", completed: false },
                    { id: 3, title: "Ngày 3: Học 50 từ mới tiếp theo", completed: false },
                    // Thêm nhiệm vụ khác
                ],
            },
            {
                id: 3,
                title: "Thử thách Học Từ Vựng 30 Ngày",
                description: "Nâng cao vốn từ vựng với 50 từ mới mỗi ngày.",
                duration: "30 ngày",
                reward: "300 điểm, Huy hiệu từ vựng",
                tasks: [
                    { id: 1, title: "Ngày 1: Học 50 từ mới", completed: false },
                    { id: 2, title: "Ngày 2: Ôn tập từ vựng và làm bài kiểm tra", completed: false },
                    { id: 3, title: "Ngày 3: Học 50 từ mới tiếp theo", completed: false },
                    // Thêm nhiệm vụ khác
                ],
            },
        ],
    },
    {
        id: 2,
        category: "Thử thách Đọc Hiểu",
        challenges: [
            {
                id: 4,
                title: "Thử thách Đọc Hiểu 7 Ngày",
                description: "Cải thiện kỹ năng đọc hiểu với 30 phút mỗi ngày.",
                duration: "7 ngày",
                reward: "100 điểm, Huy hiệu đọc hiểu",
                tasks: [
                    { id: 1, title: "Ngày 1: Đọc bài viết A", completed: false },
                    { id: 2, title: "Ngày 2: Đọc bài viết B", completed: false },
                    { id: 3, title: "Ngày 3: Đọc bài viết C", completed: false },
                    // Thêm nhiệm vụ khác
                ],
            },
            {
                id: 5,
                title: "Thử thách Đọc Hiểu 14 Ngày",
                description: "Cải thiện kỹ năng đọc hiểu với 30 phút mỗi ngày.",
                duration: "14 ngày",
                reward: "200 điểm, Huy hiệu đọc hiểu",
                tasks: [
                    { id: 1, title: "Ngày 1: Đọc bài viết A", completed: false },
                    { id: 2, title: "Ngày 2: Đọc bài viết B", completed: false },
                    { id: 3, title: "Ngày 3: Đọc bài viết C", completed: false },
                    // Thêm nhiệm vụ khác
                ],
            },
            {
                id: 6,
                title: "Thử thách Đọc Hiểu 30 Ngày",
                description: "Cải thiện kỹ năng đọc hiểu với 30 phút mỗi ngày.",
                duration: "30 ngày",
                reward: "300 điểm, Huy hiệu đọc hiểu",
                tasks: [
                    { id: 1, title: "Ngày 1: Đọc bài viết A", completed: false },
                    { id: 2, title: "Ngày 2: Đọc bài viết B", completed: false },
                    { id: 3, title: "Ngày 3: Đọc bài viết C", completed: false },
                    // Thêm nhiệm vụ khác
                ],
            },
        ],
    },
];

const ChallengeList = ({ onSelect }) => {
    return (
        <div>
            {challenges.map((category) => (
                <div key={category.id} style={{ marginBottom: "40px" }}>
                    <h2>{category.category}</h2>
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={category.challenges}
                        renderItem={(challenge) => (
                            <List.Item key={challenge.id}>
                                <Card title={challenge.title}>
                                    <Paragraph>{challenge.description}</Paragraph>
                                    <Paragraph>
                                        Thời gian: {challenge.duration}
                                        <br />
                                        Phần thưởng: {challenge.reward}
                                    </Paragraph>
                                    <Button type="primary" onClick={() => onSelect(challenge)}>
                                        Tham Gia
                                    </Button>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            ))}
        </div>
    );
};

export default ChallengeList;
