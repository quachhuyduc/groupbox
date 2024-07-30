import React, { useState, useRef } from 'react';
import { SendOutlined, UploadOutlined, AudioOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Button, Upload, message, Card } from 'antd';
import { createComment } from '../../api/api';
import { useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

const MyComment = ({ addComment, titleName, avatar }) => {
    const { taskId } = useParams();
    const { groupId } = useParams();
    const [comment, setComment] = useState('');
    const [fileList, setFileList] = useState([]);
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const [audioURL, setAudioURL] = useState('');

    const handleSend = async () => {
        const userId = localStorage.getItem('userId');
        if (comment.trim() !== '' || fileList.length > 0 || audioURL) {
            const newComment = {
                user: userId,
                task: taskId,
                content: comment,
                group: groupId,
                files: fileList.map(file => file.name),
                audio: audioURL,
            };
            try {
                console.log('Sending comment:', newComment);
                const response = await createComment(newComment);
                console.log('Comment response:', response);
                if (response.status === 'OK') {
                    addComment(response.data);
                    setComment('');
                    setFileList([]);
                    setAudioURL('');
                    message.success('Comment sent successfully.');
                } else {
                    message.error('Failed to send comment: ' + response.message);
                }
            } catch (error) {
                console.error('Error sending comment:', error);
                message.error('Failed to send comment: ' + error.message);
            }
        } else {
            message.error('Please add a comment, upload a file, or record audio.');
        }
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
        console.log('File list updated:', fileList);
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
                console.error('Error accessing microphone:', error);
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
                    src={avatar}
                    alt='User Avatar'
                    style={{ borderRadius: '50%', width: '50px', height: '50px', marginRight: '10px' }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                    <div style={{ fontWeight: 'bold' }}>{titleName}</div>
                </div>
                <TextArea
                    placeholder='Write a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                {/* <Upload
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
                </Button> */}
                <Button type='primary' onClick={handleSend} style={{ marginLeft: '10px' }}>
                    <SendOutlined />
                </Button>
            </div>
            {/* {audioURL && (
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
            )} */}
        </Card>
    );
};

export default MyComment;
