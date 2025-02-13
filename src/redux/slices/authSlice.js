import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    error: null,
    message: null,
    isEmailVerified: false,
    loading: false,
    validLink: false
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state){
      state.user = null;
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
    updateInfo(state, action){
      const {username, email, profileImg} = action.payload;
      if(username) {
        state.user.username = username;
      } else if(email) {
        state.user.email = email;
      } else if(profileImg) {
        state.user.profilePhoto = profileImg;
      }
    },
    setEmailVerified(state){
      state.isEmailVerified = true;
    },
    isLoading(state){
      state.loading = true;
    },
    clearLoading(state){
      state.loading = false;
    },
    setValidLink(state){
      state.validLink = true;
    }
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, authActions };
