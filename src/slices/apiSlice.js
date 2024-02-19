import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://faceoftamizhan-backend-ravi-devo.onrender.com' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Post'],
  endpoints: () => ({})
});