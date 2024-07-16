// src/features/tasks/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [
        { id: 1, title: 'Tóm tắt chương 2', completed: false, avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1', content: 'Content for task 1' },
        { id: 2, title: 'Nghe nhạc và làm nhiệm vụ', completed: false, avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2', content: 'Content for task 2' },
        { id: 3, title: 'Xem đoạn video và làm nhiệm vụ', completed: false, avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3', content: 'Content for task 3' }
    ],
    completedCount: 0
};


const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        toggleTaskCompletion: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                state.completedCount = state.tasks.filter(task => task.completed).length;
            }
        }
    }
});

export const { toggleTaskCompletion } = taskSlice.actions;

export default taskSlice.reducer;
