import { apiSlice } from "../api/apiSlice";
import { setCredentials, clearCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        signup: builder.mutation({
            query: credentials => ({
                url: '/signup',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        refresh: builder.query({
            query: () => '/refresh',
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                dispatch(setCredentials({ ...result.data }));
            }
        }),
        logout: builder.mutation({
            query: () => '/logout',
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(clearCredentials())
                dispatch(apiSlice.util.resetApiState());
            }
        })
    })
})

export const { useLoginMutation, useSignupMutation, useRefreshQuery, useLogoutMutation } = authApiSlice