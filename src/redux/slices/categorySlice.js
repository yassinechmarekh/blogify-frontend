import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        category: null,
        error: null,
        message: null,
        loading: false,
    },
    reducers: {
        setCategories(state, action){
            state.categories = action.payload;
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
        setCategory(state, action){
            state.category = action.payload;
        },
        isLoding(state){
            state.loading = true;
        },
        clearIsLoading(state){
            state.loading = false;
        }
    }
});

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export {categoryReducer, categoryActions}