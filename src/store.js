import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/userSlices/authSlice';
import { apiSlice } from './slices/apiSlice';
import postReducer from './slices/postSlices/postSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        post: postReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;