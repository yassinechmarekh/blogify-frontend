import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    myPosts: [],
    likedPosts: [],
    error: null,
    message: null,
    postStats: null,
    postsChart: [],
    likesCount: null,
    latestPosts: {},
    singlePost: {},
    likes: [],
    authorPosts: [],
    loading: false,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setMyPosts(state, action){
      state.myPosts = action.payload;
    },
    setLikedPosts(state, action) {
      state.likedPosts = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    clearMessage(state) {
      state.message = null;
    },
    setPostStats(state, action) {
      state.postStats = action.payload;
    },
    setPostsChart(state, action){
      state.postsChart = action.payload;
    },
    setLikesCount(state, action){
      state.likesCount = action.payload;
    },
    setLatestPosts(state, action){
      state.latestPosts = action.payload;
    },
    setSinglePost(state, action){
      state.singlePost = action.payload;
    },
    setLikes(state, action){
      state.likes = action.payload;
    },
    setAuthorPosts(state, action){
      state.authorPosts = action.payload;
    },
    isLoading(state){
      state.loading = true;
    },
    clearLoading(state){
      state.loading = false;
    }
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postReducer, postActions };
