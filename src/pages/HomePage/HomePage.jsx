import React from 'react';
import { useSelector } from 'react-redux';
import MenuComponent from '../../components/Menu/MenuComponent';
import './HomePage.css';
import { Card, Image } from 'antd';
import TaskList from '../../components/TaskList/TaskList';
import treasure from '../../asset/treasure.png'; // Import sprite sheet của con cú
import RankList from '../../components/RankList/RankList';

const HomePage = () => {
    const completedCount = useSelector(state => state.tasks.completedCount);
    const totalTasks = useSelector(state => state.tasks.tasks.length);
    const progressPercent = (completedCount / totalTasks) * 100;

    return (
        <div className="home-page-container">
            <MenuComponent mode="inline" selectedKey="1" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Card style={{ backgroundColor: "rgb(88, 204, 2)", width: '700px', marginLeft: "100px", marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '22px', fontWeight: "700", color: "white", textAlign: 'center', flex: 1 }}>Nhiệm vụ hôm nay</div>
                    </div>
                </Card>

                <Card style={{ width: '700px', marginTop: '30px', marginLeft: "100px" }}>
                    <TaskList />
                </Card>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Card style={{ width: '400px', marginLeft: "50px", marginTop: '20px', border: '2px solid #58CC02', padding: '16px', height: '450px' }} >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '22px', fontWeight: "700" }}>Top Score Day</div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <span style={{ fontSize: '22px', fontWeight: "700", marginRight: '8px' }}>BXH</span>
                        </div>
                    </div>
                    <div style={{ maxHeight: '350px', overflowY: 'auto', marginTop: "20px" }} className="hidden-scrollbar">
                        <RankList />
                    </div>
                </Card>

                <Card style={{ width: '400px', marginLeft: "50px", marginTop: '20px', border: '2px solid #58CC02', padding: '16px', height: '450px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '22px', fontWeight: "700" }}>Hoàn thành nhiệm vụ</div>
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: "500" }}>
                            Hoàn thành tất cả nhiệm vụ để được bonus điểm
                        </div>
                        <div style={{ marginTop: '20px', width: '100%', backgroundColor: '#f0f0f0', borderRadius: '8px', overflow: 'hidden' }}>
                            <div style={{ width: `${progressPercent}%`, height: '24px', backgroundColor: '#58CC02', textAlign: 'center', color: 'white', lineHeight: '24px' }}>
                                {`${completedCount}/${totalTasks}`}
                            </div>

                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <Image src={treasure} />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default HomePage;

