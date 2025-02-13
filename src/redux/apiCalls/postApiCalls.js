import axios from "axios";
import { postActions } from "../slices/postSlice";

// Get Liked Posts by User
export function getLikedPostsByUser(userId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/liked/user/${userId}`
      );
      dispatch(postActions.setLikedPosts(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get liked Posts by User with pagination
export function getLikedPostsByUserPaginate(pageNumber, page) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/liked/user/${
          getState().auth.user.userId
        }?pageNumber=${pageNumber}&page=${page}`
      );
      dispatch(postActions.setLikedPosts(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get posts by author with pagination
export function getPostsByAuthorPaginate(userId, page) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/user/${userId}?pageNumber=6&page=${page}`
      );
      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get posts by author without pagination
export function getPostsByAuthor() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/user/${getState().auth.user.userId}`
      );
      dispatch(postActions.setMyPosts(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get all posts
export function getAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get all posts with pagination
export function getAllPostsPaginate(postsNumber, page) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts?postsNumber=${postsNumber}&page=${page}`
      );
      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Create Post
export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.isLoading());
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        newPost,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(postActions.clearLoading());
      dispatch(postActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(postActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(postActions.clearLoading());
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Delete Post
export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/posts/${postId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(postActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Delete Many Posts
export function deleteManyPosts(postsIds) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts`, {
        data: { postsIds: postsIds },
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(postActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get post stats
export function getPostStats() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/count`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setPostStats(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get post chart stats
export function getStatsPostsChart() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/stats`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setPostsChart(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get Post count by author
export function getPostCountByAuthor() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/author/count`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setPostStats(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get Posts likes By Author
export function getPostsLikesByAuthor() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/likes/count`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setLikesCount(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get Latest Post By Author
export function getLatestPostsByAuthor(limit) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/latest?limit=${limit}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setLatestPosts(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get posts stats by categories and author logged
export function getPostsStasByCategoryAndAuthor() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/stats/author`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setPostsChart(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get specific post
export function getSpecificPost(slug) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/${slug}`
      );
      dispatch(postActions.setSinglePost(data));
      dispatch(postActions.setLikes(data.post.likes));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// toggle like post
export function toggleLikePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setMessage(data.message));
      dispatch(postActions.setLikes(data.likes));
      setTimeout(() => {
        dispatch(postActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// get latest post
export function getLatestPost(limit) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts?limit=${limit}`
      );
      dispatch(postActions.setLatestPosts(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get latest post by author id
export function getLatestPostsByAuthorId(authorId, limit) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/latest/author/${authorId}?limit=${limit}`
      );
      dispatch(postActions.setAuthorPosts(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get Posts By Category
export function getPostsByCategory(categoryId, postsNumber, page) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts?category=${categoryId}&postsNumber=${postsNumber}&page=${page}`
      );
      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  };
}

// Get latest posts for admin
export async function getLatestPostsAdmin(limit){
  try {
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/latest/admin?limit=${limit}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Update post
export function updatePost(postId, post){
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, post, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      });
      dispatch(postActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(postActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  }
}

// Update post image
export function updatePostImage(postId, image){
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.isLoading());
      const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/upload-photo/${postId}`, image, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(postActions.clearLoading());
      dispatch(postActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(postActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(postActions.clearLoading());
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  }
}

// search posts
export function searchPosts(query){
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts?search=${query}`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.log(error);
      dispatch(postActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(postActions.clearError());
      }, 1000);
    }
  }
}