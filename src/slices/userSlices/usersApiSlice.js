import { apiSlice } from "../apiSlice";
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: (token) => ({
                url: `${USERS_URL}/logout`,
                headers: { 'Authorization': `Bearer ${token}` },
                method: 'POST',
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = userApiSlice;