import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './slides/taskSlice'
import pointsReducer from './slides/pointSlice';
import userReducer from './slides/userSlice';
import memberReducer from './slides/memberSlice';
export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        points: pointsReducer,
        user: userReducer,
        members: memberReducer
    },
})