import axios from "axios";
import { newsletterActions } from "../slices/newsletterSlice";

// Get all emails form newsletter
export function getEmailFromNewsletter(){
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/newsletter`, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token,
                }
            });
            dispatch(newsletterActions.setEmails(data));
        } catch (error) {
            console.log(error);
        }
    }
}

// Add email to newsletter
export function addEmailToNewsletter(email){
    return async (dispatch) => {
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/newsletter`, email);
            dispatch(newsletterActions.setMessage(data.message));
            setTimeout(() => {
                dispatch(newsletterActions.clearMessage());
            }, 2000);
        } catch (error) {
            console.log(error);
            dispatch(newsletterActions.setError(error.response.data.message));
            setTimeout(() => {
                dispatch(newsletterActions.clearError());
            }, 1000);
        }
    }
}

// delete email from newsletter
export function deleteEmailFormNewsletter(id){
    return async (dispatch, getState) => {
        try {
            console.log(id);
            const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/api/newsletter/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token,
                }
            });
            dispatch(newsletterActions.setMessage(data.message));
            setTimeout(() => {
                dispatch(newsletterActions.clearMessage());
            }, 2000)
        } catch (error) {
            console.log(error);
            dispatch(newsletterActions.setError(error.response.data.message));
            setTimeout(() => {
                dispatch(newsletterActions.clearError());
            }, 1000);
        }
    }
}

// Update newsletter
export function updateNewsletter(id){
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/newsletter/${id}`,{}, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token,
                }
            });
            dispatch(newsletterActions.setMessage(data.message));
            setTimeout(() => {
                dispatch(newsletterActions.clearMessage());
            }, 2000);
        } catch (error) {
            console.log(error);
            dispatch(newsletterActions.setError(error.response.data.message));
            setTimeout(() => {
                dispatch(newsletterActions.clearError());
            }, 1000);
        }
    }
}

// Delete Many Emails form newsletter
export function deleteManyEmailsFromNewsletter(emailsIds){
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/api/newsletter`, {
                data: {emailsIds: emailsIds},
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token,
                }
            });
            dispatch(newsletterActions.setMessage(data.message));
            setTimeout(() => {
               dispatch(newsletterActions.clearMessage()); 
            }, 2000);
        } catch (error) {
            console.log(error);
            dispatch(newsletterActions.setError(error.response.data.message));
            setTimeout(() => {
               dispatch(newsletterActions.clearError());
            }, 1000)
        }
    }
}