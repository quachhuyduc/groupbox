import React, { useEffect, useState } from 'react';
import MenuComponent from '../../components/Menu/MenuComponent';
import { Card, Image } from 'antd';
import trophy from '../../asset/trophy.webp'; // Import hình ảnh trophy
import RankList from '../../components/RankList/RankList';
import { CrownOutlined } from '@ant-design/icons';
import RankListMonth from '../../components/RankList/RankListMonth';
import MyPoint from '../../components/RankList/MyPoint';
import { getUser, getUserList } from '../../api/api.js';

const RankListPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserRank, setCurrentUserRank] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const userDataResponse = await getUser(userId);
                    const userData = userDataResponse.data;
                    const response = await getUserList();
                    const usersDataList = response.data;
                    const sortedUsers = usersDataList.sort((a, b) => b.pointday - a.pointday);
                    const rank = sortedUsers.findIndex(user => user._id === userId) + 1;
                    setCurrentUser(userData);
                    setCurrentUserRank(rank);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="home-page-container">
            <MenuComponent mode="inline" selectedKey="2" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Card style={{ backgroundColor: "rgb(88, 204, 2)", width: '700px', marginLeft: "100px", marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <CrownOutlined style={{ fontSize: '30px', color: "yellow", marginRight: '8px' }} />
                        <div style={{ fontSize: '22px', fontWeight: "700", color: "white", textAlign: 'center', flex: 1 }}>BẢNG XẾP HẠNG</div>
                        <CrownOutlined style={{ fontSize: '30px', color: "yellow", marginRight: '8px' }} />
                    </div>
                </Card>
                <Card style={{ backgroundColor: "rgb(88, 100, 3)", width: '700px', marginLeft: "100px", marginTop: '20px', height: "40px", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                    <div style={{ fontSize: '22px', fontWeight: "500", color: "white" }}>
                        Xếp Hạng Ngày
                    </div>
                </Card>

                <Card style={{ width: '700px', marginTop: '30px', marginLeft: "100px", border: '2px solid #58CC02' }}>
                    <div style={{ maxHeight: '350px', overflowY: 'auto', marginTop: "20px" }} className="hidden-scrollbar">
                        <RankList />
                    </div>
                </Card>
                <Card style={{ width: '700px', marginTop: '30px', marginLeft: "100px", border: '2px solid #58CC02' }}>
                    <div style={{}}>
                        {!loading && currentUser && (
                            <MyPoint user={currentUser} rank={currentUserRank} />
                        )}
                    </div>
                </Card>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Card style={{ width: '400px', marginLeft: "50px", marginTop: '20px', border: '2px solid #58CC02', padding: '16px', height: '420px' }}>
                    <Card style={{ backgroundColor: "rgb(88, 100, 3)", width: '300px', height: "40px", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                        <div style={{ fontSize: '22px', fontWeight: "500", color: "white" }}>
                            Xếp Hạng Tuần
                        </div>
                    </Card>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: "20px" }} className="hidden-scrollbar">
                        <RankListMonth />
                    </div>
                </Card>

                <Card style={{ width: '400px', marginLeft: "50px", marginTop: '20px', border: '2px solid #58CC02', padding: '16px', height: '330px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '22px', fontWeight: "700" }}>Xếp hạng của tôi : {currentUserRank || '-'}</div>
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: "500" }}>
                            Cố gắng hơn nữa để đươc Top 3 nào !!
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <Image src={trophy} style={{ height: 180 }} />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default RankListPage;
