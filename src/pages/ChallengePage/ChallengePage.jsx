import ChallengeList from '../../components/Comment/ChallengeComponent/ChallengeList';
import ChallengeDetail from '../../components/Comment/ChallengeComponent/ChallengeDetail';
import React, { useState } from "react";
import { Typography } from "antd";
import MenuComponent from '../../components/Menu/MenuComponent';

const { Title } = Typography;
const ChallengePage = () => {
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    const handleSelectChallenge = (challenge) => {
        setSelectedChallenge(challenge);
    };

    const handleCompleteTask = (taskId) => {
        setSelectedChallenge((prevChallenge) => {
            const updatedTasks = prevChallenge.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: true } : task
            );
            return { ...prevChallenge, tasks: updatedTasks };
        });
    };

    return (
        <div className="home-page-container" style={{ display: 'flex' }}>
            <MenuComponent mode="inline" selectedKey="9" />
            <div style={{ padding: "20px" }}>
                <Title>Thách Thức Học Tập</Title>
                {!selectedChallenge ? (
                    <ChallengeList onSelect={handleSelectChallenge} />
                ) : (
                    <ChallengeDetail challenge={selectedChallenge} onCompleteTask={handleCompleteTask} />
                )}
            </div>
        </div>
    );
}

export default ChallengePage