import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    myComments: [],
    likedComments: [],
    error: null,
    message: null,
    commentStats: null,
    likesCommentsCount: null
  },
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
    setMyComments(state, action){
      state.myComments = action.payload;
    },
    setLikedComments(state, action){
      state.likedComments = action.payload;
    },
    setError(state, action){
        state.error = action.payload;
    },
    clearError(state){
        state.error = null;
    },
    setMessage(state, action){
      state.message = action.payload;
    },
    clearMessage(state){
      state.message = null;
    },
    setCommentStats(state, action) {
      state.commentStats = action.payload;
    },
    setLikesCommentsCount(state, action){
      state.likesCommentsCount = action.payload;
    },
    addComment(state, action){
      state.comments.push(action.payload);
    },
    likeComment(state, action) {
      state.comments = state.comments.map(comment =>
        comment._id === action.payload._id
          ? { ...comment, likes: action.payload.likes }
          : comment
      );
    }
  },
});

const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export { commentReducer, commentActions };
