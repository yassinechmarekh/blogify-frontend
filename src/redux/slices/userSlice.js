import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    authors: [],
    readers: [],
    usersLimit: {},
    user: null,
    error: null,
    message: null,
    loading: false,
    authorsStats: null,
    readersStats: null
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setError(state,action){
        state.error = action.payload;
    },
    clearError(state){
        state.error = null;
    },
    setMessage(state,action){
        state.message = action.payload;
    },
    clearMessage(state){
        state.message = null;
    },
    setAuthors(state,action){
        state.authors = action.payload;
    },
    setReaders(state, action){
        state.readers = action.payload;
    },
    setUser(state, action){
        state.user = action.payload;
    },
    isLoading(state){
      state.loading = true;
    },
    clearLoading(state){
      state.loading = false;
    },
    setProfileImage(state, action){
      state.user.profilePhoto = action.payload;
    },
    setUsersLimit(state, action){
      state.usersLimit = action.payload;
    },
    setAuthorsStats(state,action) {
      state.authorsStats = action.payload;
    },
    setReadersStats(state, action){
      state.readersStats = action.payload;
    }
  },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export { userReducer, userActions };
