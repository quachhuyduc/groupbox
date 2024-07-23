import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    points: 0,
    status: 'idle',
    error: null,
    taskStatus: {}
};

export const updateUserPoints = createAsyncThunk(
    'points/updateUserPoints',
    async ({ userId, points }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/updatePoints', { userId, points });
            console.log('API Response:', response.data); // Log phản hồi của API
            return response.data; // Đảm bảo rằng `response.data` có chứa `newPoints`
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);




const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
        addPoints: (state, action) => {
            state.points += action.payload;
        },
        resetPoints: (state) => {
            state.points = 0;
        },
        setTaskStatus: (state, action) => {
            const { taskId, status, points } = action.payload;
            state.taskStatus[taskId] = { completed: status, points };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserPoints.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserPoints.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.points = action.payload.totalPoints; // Cập nhật tổng điểm từ API
            })
            .addCase(updateUserPoints.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});



export const { addPoints, resetPoints, setTaskStatus } = pointsSlice.actions;

export default pointsSlice.reducer;
