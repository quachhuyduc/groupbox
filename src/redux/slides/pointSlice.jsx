import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    points: 0,
    status: 'idle',
    error: null
};

export const updateUserPoints = createAsyncThunk(
    'points/updateUserPoints',
    async ({ userId, points }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/updatePoints', { userId, points });
            return response.data;
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserPoints.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserPoints.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateUserPoints.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { addPoints, resetPoints } = pointsSlice.actions;

export default pointsSlice.reducer;
