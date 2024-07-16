
import { Avatar, List } from 'antd';
const data = [
    {
        title: 'Ant Design Title 1',
    },
];
const MyPoint = () => {
    return (
        <>
            <List
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="200 Điểm"
                        />
                    </List.Item>
                )}
            />
        </>
    );
};
export default MyPoint;