import React, { useState } from 'react';
import MenuComponent from '../../components/Menu/MenuComponent';
import './DetailPage.css'; // Import the CSS file
import { Card } from 'antd';
import CommentList from '../Comment/CommentList';
import MyComment from '../Comment/MyComment';
import LyricsContent from './LyricsContent';
import BonusPoint from '../../components/BonusPoint';
import MyEarnPoint from '../../components/MyEarnPonint';

const DetailPageLyrics = () => {
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

    const bonusCriteria = [
        { description: 'Bài viết được gửi nhanh nhất', points: 5 },
        { description: 'Bài viết được nhiều Like nhất', points: 5 },
    ];

    const avatarUrl = "https://example.com/avatar.jpg";
    const titleName = "Nguyễn Văn A";
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
                        <LyricsContent />
                    </Card>
                    <Card style={{ width: '700px', marginTop: '30px', marginLeft: "100px" }}>

                        <CommentList comments={comments} />

                    </Card>
                    <Card style={{ width: '700px', marginTop: '30px', marginLeft: "100px" }}>
                        <MyComment addComment={addComment} />
                    </Card>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                    <Card style={{ width: '400px', marginLeft: "50px", marginTop: '20px', border: '2px solid #58CC02', padding: '16px', height: '150px' }}>
                        <MyEarnPoint />
                    </Card>
                    <Card style={{ width: '400px', marginLeft: "50px", marginTop: 30, border: '2px solid #58CC02', height: '500px' }}>
                        <BonusPoint
                            criteria={bonusCriteria}
                            avatarUrl={avatarUrl}
                            name={titleName}
                        />
                    </Card>
                </div>
            </div>


        </>
    );
};

export default DetailPageLyrics;