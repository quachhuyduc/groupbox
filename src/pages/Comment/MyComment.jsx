import React, { useState, useRef } from 'react';
import { SendOutlined, UploadOutlined, AudioOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Button, Upload, message, Card } from 'antd';

const MyComment = ({ addComment }) => {
    const [comment, setComment] = useState('');
    const [fileList, setFileList] = useState([]);
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const [audioURL, setAudioURL] = useState('');

    const handleSend = () => {
        if (comment.trim() !== '' || fileList.length > 0 || audioURL) {
            const newComment = {
                title: 'New Comment Title',
                userName: 'Current User',
                content: comment,
                avatar: 'https://via.placeholder.com/50',
                files: fileList,
                audio: audioURL,
            };
            addComment(newComment);
            setComment('');
            setFileList([]);
            setAudioURL('');
        } else {
            message.error('Please add a comment, upload a file, or record audio.');
        }
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const startRecording = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.ondataavailable = event => {
                    const audioChunks = [];
                    audioChunks.push(event.data);
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioURL(audioUrl);
                };
                mediaRecorderRef.current.start();
                setRecording(true);
            }).catch(error => {
                console.error('Error accessing microphone: ', error);
                message.error('Microphone access denied.');
            });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    const deleteAudio = () => {
        setAudioURL('');
    };

    return (
        <Card style={{ margin: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                <img
                    src='https://via.placeholder.com/50'
                    alt='User Avatar'
                    style={{ borderRadius: '50%', width: '50px', height: '50px', marginRight: '10px' }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                    <div style={{ fontWeight: 'bold' }}>Title</div>
                    <div style={{ fontWeight: 'bold' }}>User Name</div>
                </div>
                <Input
                    style={{ flex: 3, marginRight: '10px' }}
                    placeholder='Write a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Upload
                    fileList={fileList}
                    onChange={handleUploadChange}
                    beforeUpload={() => false} // Prevent automatic upload
                    multiple
                    listType='picture'
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>

                <Button
                    icon={recording ? <AudioOutlined style={{ color: 'red' }} /> : <AudioOutlined />}
                    onClick={recording ? stopRecording : startRecording}
                    style={{ marginLeft: '10px' }}
                >
                    {recording ? 'Stop' : 'Record'}
                </Button>
                <Button type='primary' onClick={handleSend} style={{ marginLeft: '10px' }}>
                    <SendOutlined />
                </Button>
            </div>
            {audioURL && (
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    <audio controls src={audioURL} style={{ marginRight: '10px', width: '100%' }} />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={deleteAudio}
                        danger
                    >
                        Delete
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default MyComment;
