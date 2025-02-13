import axios from "axios";
import { userActions } from "../slices/userSlice";

// Get all users
export function getAllUser() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(userActions.setUsers(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// Create a new Author
export function createAuthor(author) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/authors`,
        author,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(userActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(userActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(userActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 1000);
    }
  };
}

// Delete User
export function deleteUser(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/profile/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(userActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(userActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(userActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 1000);
    }
  };
}

// Get All Authors
export function getAllAuthors() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/authors`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(userActions.setAuthors(data));
    } catch (error) {
      console.log(error);
      dispatch(userActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 1000);
    }
  };
}

// Get all Readers
export function getAllReaders() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/readers`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(userActions.setReaders(data));
    } catch (error) {
      console.log(error);
      dispatch(userActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 1000);
    }
  };
}

// Get specific user
export function getUser(userId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/profile/${userId}`
      );
      dispatch(userActions.setUser(data));
    } catch (error) {
      console.log(error);
      dispatch(userActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 1000);
    }
  };
}

// Update Profile
export function updateDataProfile(userId, userData) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/profile/${userId}`,
        userData,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(userActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(userActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(userActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 1000);
    }
  };
}

// Upload profile image
export function uploadProfileImage(image) {
  return async (dispatch, getState) => {
    try {
      dispatch(userActions.isLoading());
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/profile/upload-profile-photo`,
        image,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(userActions.clearLoading());
      dispatch(userActions.setProfileImage(data.profilePhoto));
      dispatch(userActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(userActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(authActions.clearLoading());
      dispatch(userActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 1000);
    }
  };
}

// Update account information
export function updateAccountInfo(info) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/password/${
          getState().auth.user.userId
        }`,
        info,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(userActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(userActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(userActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 1000);
    }
  };
}

// Get limit users
export function getLimitUsers(limit) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/profile?limit=${limit}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(userActions.setUsersLimit(data));
    } catch (error) {
      console.log(error);
      dispatch(userActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 1000);
    }
  };
}

// Get Authors count
export function getAuthorsStats() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/authors/count`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(userActions.setAuthorsStats(data));
    } catch (error) {
      console.log(error);
      dispatch(userActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 1000);
    }
  };
}

// Get Readers count
export function getReadersStats() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/readers/count`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(userActions.setReadersStats(data));
    } catch (error) {
      console.log(error);
      dispatch(userActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 1000);
    }
  };
}

// Get Usee admin
export async function getAdminUser() {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/admin`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Delete user account
export function deleteUserAccount(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/profile/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(userActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(userActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(userActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(userActions.clearError());
      }, 1000);
    }
  };
}

export async function getLimitAuthors(limit) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/users/authors/limited?limit=${limit}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
