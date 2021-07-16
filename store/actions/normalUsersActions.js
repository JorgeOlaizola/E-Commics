import {user} from '../types';
import axios from 'axios';


// Session 

export function getUserData() {
    return async function(dispatch) {
        try {
            const userData = await axios.get(`/api/users`);
            dispatch({ type: user.GET_USER_DATA, payload: userData.data })
            
        } catch (error) {
            console.error(error)    
        }
    }
}

export function register() {
    
}

export function signIn(data) {
    return async function(dispatch) {
        try {
            const userData = await axios.post(`/api/users/logIn`, data);
            /* const userData = await axios.get(`/api/users`); */
            localStorage.setItem("sessionSaved", JSON.stringify(userData.data))
            dispatch({ type: user.GET_USER_DATA, payload: userData.data })
            
        } catch (error) {
            console.error(error)    
        }
    }
}

export function signOut() {
    return async function(dispatch) {
        localStorage.setItem("sessionSaved", JSON.stringify("no session"))
        dispatch({ type: user.CLEAR_USER_DATA})
    }
}

// Tools

export function handleFavorites(productId, productImg, productTitle, productPrice, userId) {
    return (dispatch) => {
        axios.post(`/api/users/favorites`, {productId, productImg, productTitle, productPrice, userId})
        .then((response => dispatch({ type: user.HANDLE_FAVORITES, payload: response.data})
        ))}}

// ADMIN users actions

export function findUser(nickname) {
    
}
