
import React from "react";
import { Card, Progress, Typography } from "antd";
import TaskChallenge from "./TaskChallenge";

const { Paragraph } = Typography;

const ChallengeDetail = ({ challenge, onCompleteTask }) => {
    const completedTasks = challenge.tasks.filter(task => task.completed).length;
    const totalTasks = challenge.tasks.length;
    const progress = (completedTasks / totalTasks) * 100;

    return (
        <Card title={challenge.title}>
            <Paragraph>{challenge.description}</Paragraph>
            <Paragraph>Thời gian: {challenge.duration}</Paragraph>
            <Paragraph>Phần thưởng: {challenge.reward}</Paragraph>
            <Progress percent={progress} />
            <TaskChallenge tasks={challenge.tasks} onCompleteTask={onCompleteTask} />
        </Card>
    );
};
export default ChallengeDetail
