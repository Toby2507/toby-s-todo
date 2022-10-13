import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import filterReducer from '../features/todos/todoFilterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware), devTools: true
})
