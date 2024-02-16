import { apiSlice } from "./apiSlice";
const POST_URL = 'api/posts';
//const postId = '65c8a062a0d8b4259724a08b'

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPost: builder.mutation({
            query: () => ({
                url: `${POST_URL}/`,
                method: 'GET'
            })
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: `${POST_URL}/`,
                method: 'POST',
                body: data
            })
        }),
        getMyPost: builder.mutation({
            query: () => ({
                url: `${POST_URL}/myPost`,
                method: 'GET'
            })
        }),
        deletePost: builder.mutation({
            query: (postId) => ({
                url: `${POST_URL}/${postId}`,
                method: 'DELETE'
            })
        }),
        like: builder.mutation({
            query: (postId) => ({
                url: `${POST_URL}/${postId}/like`,
                method: 'POST'
            })
        }),
        dislike: builder.mutation({
            query: (postId) => ({
                url: `${POST_URL}/${postId}/dislike`,
                method: 'POST'
            })
        }),
        addComment: builder.mutation({
            query: (args) => {
                const { postId, text } = args
                return {
                    url: `${POST_URL}/${postId}/comment`,
                    method: 'POST',
                    body: text
                }
            }
        }),
        deleteComment: builder.mutation({
            query: (args) => {
                const { postId, commentId } = args;
                return {
                    url: `${POST_URL}/${postId}/comment/${commentId}`,
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