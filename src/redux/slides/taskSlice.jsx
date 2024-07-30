// src/features/tasks/taskSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTasksByCategory } from '../../api/api';

const initialState = {
    tasks: [],
    completedCount: 0
};

export const fetchTasksByCategory = createAsyncThunk(
    'tasks/fetchTasksByCategory',
    async (category, thunkAPI) => {
        try {
            const response = await getTasksByCategory(category);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksByCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasksByCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasksByCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { toggleTaskCompletion, setTasks, addTask } = taskSlice.actions;

export default taskSlice.reducer;
