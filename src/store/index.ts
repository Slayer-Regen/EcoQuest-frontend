import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import authReducer from '../slices/authSlice';
import uiReducer from '../slices/uiSlice';
import darkModeReducer from '../slices/darkModeSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        ui: uiReducer,
        darkMode: darkModeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
