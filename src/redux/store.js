import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { commentReducer } from "./slices/commentSlice";
import { postReducer } from "./slices/postSlice";
import { categoryReducer } from "./slices/categorySlice";
import { newsletterReducer } from "./slices/newsletterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    comment: commentReducer,
    post: postReducer,
    category: categoryReducer,
    newsletter: newsletterReducer,
  },
});

export default store;
