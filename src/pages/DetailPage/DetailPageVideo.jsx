import React, { useState } from 'react';
import MenuComponent from '../../components/Menu/MenuComponent';
import './DetailPage.css'; // Import the CSS file
import { Card } from 'antd';
import { CrownOutlined } from '@ant-design/icons';
import RankList from '../../components/RankList/RankList';
import CommentList from '../Comment/CommentList';
import MyComment from '../Comment/MyComment';
import VideoContent from './VideoContent';

const DetailPageVideo = () => {
    const [comments, setComments] = useState([
        {
            title: 'Sample Title',
            userName: 'Sample User',
            content: 'Sample Comment',
            avatar: 'https://via.placeholder.com/50',
        },
    ]);

    const addComment = (comment) => {
        setComments([comment, ...comments]);
    };
    return (
        <>
            <div className="home-page-container">
                <MenuComponent mode="inline" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card style={{ backgroundColor: "rgb(88, 204, 2)", width: '700px', marginLeft: "100px", marginTop: '20px' }}>
                        <div style={{ fontSize: '22px', lineHeight: "28px", fontStyle: "normal", fontWeight: "700", color: "white", textAlign: 'center', flex: 1 }}>Nghe Đoạn nhạc sau đây</div>
                        <div style={{ fontSize: '22px', lineHeight: "28px", fontStyle: "normal", fontWeight: "700", color: "white", textAlign: 'center', flex: 1 }}>(Harry Potter)</div>

                    </Card>
                    <Card style={{ width: '700px', marginLeft: "100px", marginTop: '20px' }}>
                        <VideoContent />
                    </Card>
                    <Card style={{ width: '700px', marginTop: '30px', marginLeft: "100px" }}>

                        <CommentList comments={comments} />

                    </Card>
                    <Card style={{ width: '700px', marginTop: '30px', marginLeft: "100px" }}>
                        <MyComment addComment={addComment} />
                    </Card>
                </div>

                <Card style={{ width: '400px', marginLeft: "50px", marginTop: '20px', border: '2px solid #58CC02', padding: '16px', height: '450px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '22px', lineHeight: "28px", fontStyle: "normal", fontWeight: "700" }}>Bảng xếp hạng</div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <CrownOutlined style={{ fontSize: '30px', fontStyle: "normal", fontWeight: "500", color: "yellow", marginRight: '8px' }} />
                            <span style={{ fontSize: '22px', lineHeight: "28px", fontStyle: "normal", fontWeight: "700", marginRight: '8px' }}>Rank:</span>
                            <span style={{ fontSize: '22px', lineHeight: "28px", fontStyle: "normal", fontWeight: "700" }}>1</span>
                        </div>
                    </div>
                    <div style={{ maxHeight: '350px', overflowY: 'auto', marginTop: "20px" }} className="hidden-scrollbar">
                        <RankList />
                    </div>
                </Card>
            </div>


        </>
    );
};

export default DetailPageVideo;