import React from 'react';
import MenuComponent from '../../components/Menu/MenuComponent';
import './HomePage.css';
import { Card } from 'antd';
import TaskList from '../../components/TaskList/TaskList';
import RankList from '../../components/RankList/RankList';

const HomePage = () => {

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
            </div>
        </div>
    );
};

export default HomePage;

