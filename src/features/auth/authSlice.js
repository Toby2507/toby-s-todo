import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { userId: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { userId, accessToken } = action.payload;
            state.userId = userId;
            state.token = accessToken;
        },
        clearCredentials: state => {
            state.userId = null;
            state.token = null;
        }
    }
})

export const { setCredentials, clearCredentials } = authSlice.actions;
export const selectUser = state => state.auth;
export default authSlice.reducer;