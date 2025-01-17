// src/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { setUsers } = userSlice.actions;
export const selectUsers = (state) => state.user.users;
export default userSlice.reducer;
