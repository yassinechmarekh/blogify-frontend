import axios from "axios";
import { categoryActions } from "../slices/categorySlice";

// Get All Categories
export function getAllCategories() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`);
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      console.log(error);
      dispatch(categoryActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearError());
      }, 1000);
    }
  };
}

// Create Category
export function createCategory(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/categories`,
        newCategory,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(categoryActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(categoryActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearError());
      }, 1000);
    }
  };
}

// Get specific category
export function getCategory(slug) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/categories/${slug}`
      );
      dispatch(categoryActions.setCategory(data));
    } catch (error) {
      console.log(error);
      dispatch(categoryActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearError());
      }, 1000);
    }
  };
}

// Update category image
export function updateCategoryImage(categoryId, image) {
  return async (dispatch, getState) => {
    try {
      dispatch(categoryActions.isLoding());
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/categories/upoad-image/${categoryId}`,
        image,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(categoryActions.clearIsLoading());
      dispatch(categoryActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(categoryActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearError());
      }, 1000);
    }
  };
}

// Update data Category
export function updateCategory(categoryId, updateCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/categories/${categoryId}`,
        updateCategory,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(categoryActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(categoryActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearError());
      }, 1000);
    }
  };
}

// Delete Category
export function deleteCategory(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/categories/${categoryId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(categoryActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearMessage());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(categoryActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearError());
      }, 1000);
    }
  };
}

// Delete many categories
export function deleteManyCategories(categoriesIds) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/categories`,
        {
          data: { categories: categoriesIds },
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(categoryActions.setMessage(data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearMessage());
      }, 1000);
    } catch (error) {
      console.log(error);
      dispatch(categoryActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearError());
      }, 1000);
    }
  };
}

// get limit categories
export function getLimitCategories(limit) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/categories?limit=${limit}`
      );
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      console.log(error);
      dispatch(categoryActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearError());
      }, 1000);
    }
  };
}

// get all categories with pagination
export function getAllCategoriesPaginate(categoriesNumber, page) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/categories?categoriesNumber=${categoriesNumber}&page=${page}`
      );
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      console.log(error);
      dispatch(categoryActions.setError(error.response.data.message));
      setTimeout(() => {
        dispatch(categoryActions.clearError());
      }, 1000);
    }
  };
}

// footer categories
export async function getFooterCategories(limit) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/categories?limit=${limit}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
