// src/features/tasks/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
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
        },
        setTasks: (state, action) => {
            console.log("Setting tasks:", action.payload); // Debug log
            state.tasks = action.payload;
        },
        addTask: (state, action) => {
            const newTask = action.payload;
            if (!state.tasks.find(task => task.id === newTask.id)) {
                state.tasks.push(newTask);
            }
        }
    }
});

export const { toggleTaskCompletion, setTasks, addTask } = taskSlice.actions;

export default taskSlice.reducer;
