import React from "react";
import { List, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";


const TaskChallenge = ({ tasks, onCompleteTask }) => {
    return (
        <List
            dataSource={tasks}
            renderItem={(task) => (
                <List.Item
                    actions={[
                        <Button
                            type="link"
                            icon={<CheckCircleOutlined />}
                            onClick={() => onCompleteTask(task.id)}
                            disabled={task.completed}
                        >
                            {task.completed ? "Đã Hoàn Thành" : "Hoàn Thành"}
                        </Button>,
                    ]}
                >
                    <List.Item.Meta title={task.title} />
                </List.Item>
            )}
        />
    );
};
export default TaskChallenge