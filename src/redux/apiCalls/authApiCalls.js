import axios from "axios";
import { authActions } from "../slices/authSlice";

// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      dispatch(authActions.isLoading());
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        user
      );
      dispatch(authActions.clearLoading());
      dispatch(authActions.login(data));
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      dispatch(authActions.clearLoading());
      dispatch(authActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(authActions.clearError());
      }, 1000);
    }
  };
}

// Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("user");
  };
}

// Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      dispatch(authActions.isLoading());
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        user
      );
      dispatch(authActions.clearLoading());
      dispatch(authActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(authActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(authActions.clearLoading());
      dispatch(authActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(authActions.clearError());
      }, 1000);
    }
  };
}

// Update user auth
export function updateUserAuth(username, email, profileImg) {
  return async (dispatch, getState) => {
    dispatch(authActions.updateInfo({ username, email, profileImg }));
    localStorage.setItem("user", JSON.stringify(getState().auth.user));
  };
}

// verify user account
export function verifyUserAccount(userId, token) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/${userId}/verify/${token}`
      );
      dispatch(authActions.setEmailVerified());
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(authActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(authActions.clearError());
      }, 1000);
    }
  };
}

// forget password
export function forgetPassword(email) {
  return async (dispatch) => {
    try {
      dispatch(authActions.isLoading());
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forget-password`,
        {
          email: email,
        }
      );
      dispatch(authActions.clearLoading());
      dispatch(authActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(authActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(authActions.clearLoading());
      dispatch(authActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(authActions.clearError());
      }, 1000);
    }
  };
}

// Validate reset password link
export function validateResetPasswordLink(userId, token) {
  return async (dispatch) => {
    try {
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${userId}/${token}`
      );
      dispatch(authActions.setValidLink());
    } catch (error) {
      console.log(error);
      dispatch(authActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(authActions.clearError());
      }, 1000);
    }
  };
}

// reset password
export function resetPassword(user, password){
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${user.userId}/${user.token}`, {
        password: password
      });
      dispatch(authActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(authActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(authActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(authActions.clearError());
      }, 1000);
    }
  }
}
