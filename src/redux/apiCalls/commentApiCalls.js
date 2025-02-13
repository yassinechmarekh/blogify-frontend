import axios from "axios";
import { commentActions } from "../slices/commentSlice";

// Get Comments by user
export function getCommentsByUser(userId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/comments/user/${userId}`
      );
      dispatch(commentActions.setMyComments(data));
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        dispatch(commentActions.setError(error.response.data.message));
      }, 1000);
    }
  };
}

// Get All Comments
export function getAllComments() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(commentActions.setComments(data));
    } catch (error) {
      console.log(error);
      dispatch(commentActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(commentActions.clearError());
      }, 1000);
    }
  };
}

// Delete Comment
export function deleteComment(commentId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/comments/${commentId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(commentActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(commentActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(commentActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(commentActions.clearError());
      }, 1000);
    }
  };
}

// Delete Many Comments
export function deleteManyComments(commentsIds){
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/api/comments`,{
        data: {commentsIds: commentsIds},
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      });
      dispatch(commentActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(commentActions.clearMessage());
      }, 2000)
    } catch (error) {
      console.log(error);
      dispatch(commentActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(commentActions.clearError());
      }, 1000);
    }
  }
}

// Get liked comments with pagination
export function getLikedComments(pageNumber, page){
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/liked?pageNumber=${pageNumber}&page=${page}`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      });
      dispatch(commentActions.setLikedComments(data));
    } catch (error) {
      console.log(error);
      dispatch(commentActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(commentActions.clearError());
      }, 1000);
    }
  }
}

// Get comments stats (admin)
export function getCommentsStats(){
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/count`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      });
      dispatch(commentActions.setCommentStats(data));
    } catch (error) {
      console.log(error);
      dispatch(commentActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(commentActions.clearError());
      }, 1000);
    }
  }
}

// Get comments stats (author)
export function getCommentStatsByAuthor(){
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/author/count`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      });
      dispatch(commentActions.setCommentStats(data));
    } catch (error) {
      console.log(error);
      dispatch(commentActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(commentActions.clearError());
      }, 1000);
    }
  }
}

// Get likes comments count by author
export function getLikesCommentsCountByAuthor(){
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/likes/count`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(commentActions.setLikesCommentsCount(data));
    } catch (error) {
      console.log(error);
      dispatch(commentActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(commentActions.clearError());
      }, 1000);
    }
  }
}

// Get comments by post
export function getCommentsByPost(postId){
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/post/${postId}`);
      dispatch(commentActions.setComments(data));
    } catch (error) {
      console.log(error);
      dispatch(commentActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(commentActions.clearError());
      }, 1000);
    }
  }
}

// Create comment
export function createComment(newComment){
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/comments`, newComment, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      });
      dispatch(commentActions.addComment(data));
    } catch (error) {
      console.log(error);
      dispatch(commentActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(commentActions.clearError());
      }, 1000);
    }
  }
}

// Like comment
export function likeComment(commentId){
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/comments/like/${commentId}`, {}, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      });
      dispatch(commentActions.likeComment(data));
    } catch (error) {
      console.log(error);
      dispatch(commentActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(commentActions.clearError());
      }, 1000);
    }
  }
}