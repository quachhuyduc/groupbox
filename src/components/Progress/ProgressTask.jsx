import React from 'react'
import { Flex, Progress } from 'antd';
const ProgressTask = () => {
    return (
        <Flex
            vertical
            gap="small"
            style={{
                width: 160,

            }}
        >
            <Progress percent={50} size={[200, 20]} status="active" style={{
            }} />

        </Flex>
    )
}

export default ProgressTask;