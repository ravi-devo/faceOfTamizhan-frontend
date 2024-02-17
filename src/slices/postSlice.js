import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postItems: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setInitialPost: (state, action) => {
            state.postItems = action.payload
        },
        createPost: (state, action) => {
            state.postItems.unshift(action.payload);
        },
        getMyPost: (state, action) => {
            state.postItems = action.payload;
        },
        deletePost: (state, action) => {
            const postId = action.payload;
            state.postItems = state.postItems.filter(post => post._id != postId);
        },
        addComment: (state, action) => {
            const { postId, comment } = action.payload;
            const post = state.postItems.find(post => post._id === postId);
            if (post) post.comments.push(comment);
        },
        deleteComment: (state, action) => {
            const { postId, commentId } = action.payload;
            const post = state.postItems.find(post => post._id === postId);
            if (post) post.comments = post.comments.filter(comment => comment._id !== commentId);
        },
    }
})

export const {
    setInitialPost,
    createPost,
    getMyPost,
    deletePost,
    addComment,
    deleteComment
} = postSlice.actions;

export default postSlice.reducer;