import { createSlice } from "@reduxjs/toolkit";

const newsletterSlice = createSlice({
    name: 'newsletter',
    initialState: {
        emails: [],
        error: null,
        message: null
    },
    reducers: {
        setEmails(state, action){
            state.emails = action.payload;
        },
        setError(state, action){
            state.error = action.payload;
        },
        clearError(state){
            state.emails = null;
        },
        setMessage(state, action){
            state.message = action.payload;
        },
        clearMessage(state){
            state.message = null;
        }
    }
});

const newsletterReducer = newsletterSlice.reducer;
const newsletterActions = newsletterSlice.actions;

export {newsletterReducer, newsletterActions}