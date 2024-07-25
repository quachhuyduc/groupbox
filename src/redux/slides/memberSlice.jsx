import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMemberList } from '../../api/api.js';

export const fetchMembers = createAsyncThunk('members/fetchMembers', async (groupId) => {
    const response = await getMemberList(groupId);
    console.log('API Response:', response);
    return response;
});

const memberSlice = createSlice({
    name: 'members',
    initialState: {
        members: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                console.log('Fulfilled Action Payload:', action.payload); // Kiểm tra dữ liệu lưu vào Redux
                state.status = 'succeeded';
                state.members = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});


export default memberSlice.reducer;
