import { apiSlice } from "../apiSlice";
const POST_URL = 'api/posts';

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPost: builder.mutation({
            query: (token) => ({
                url: `${POST_URL}/`,
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            })
        }),
        createPost: builder.mutation({
            query: (args) => {
                const { data, token } = args;
                return {
                    url: `${POST_URL}/`,
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: data
                }
            }
        }),
        getMyPost: builder.mutation({
            query: (token) => ({
                url: `${POST_URL}/myPost`,
                headers: { 'Authorization': `Bearer ${token}` },
                method: 'GET'
            })
        }),
        deletePost: builder.mutation({
            query: (args) => {
                const {postId, token} = args;
                console.log(`PostId: ${postId}`)
                return {
                    url: `${POST_URL}/${postId}`,
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: 'DELETE',
                }
            }
        }),
        like: builder.mutation({
            query: (args) => {
                const {postId, token} = args;
                return {
                    url: `${POST_URL}/${postId}/like`,
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: 'POST'
                }
            }
        }),
        dislike: builder.mutation({
            query: (args) => {
                const {postId, token} = args;
                return{
                    url: `${POST_URL}/${postId}/dislike`,
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: 'POST'
                }  
            }
        }),
        addComment: builder.mutation({
            query: (args) => {
                const { postId, text, token } = args
                return {
                    url: `${POST_URL}/${postId}/comment`,
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: 'POST',
                    body: text
                }
            }
        }),
        deleteComment: builder.mutation({
            query: (args) => {
                const { postId, commentId, token } = args;
                return {
                    url: `${POST_URL}/${postId}/comment/${commentId}`,
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: 'DELETE'
                }
            }
        }),
    })
})

export const {
    useGetPostMutation,
    useCreatePostMutation,
    useGetMyPostMutation,
    useDeletePostMutation,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useLikeMutation,
    useDislikeMutation
} = postApiSlice;