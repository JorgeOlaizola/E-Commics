import {user} from '../types';
import axios from 'axios';


// Session 

export function getUserData() {
    return async function(dispatch) {
        try {
            const localData = JSON.parse(localStorage.getItem("sessionSaved"));
            const loginVerification = await axios.get(`/api/users?token=${localData.token}`);
            if(loginVerification.data.login){
                dispatch({ type: user.GET_USER_DATA, payload: localData})
            }    
        } catch (error) {
            console.error(error)    
        }
    }
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
        const localData = JSON.parse(localStorage.getItem("sessionSaved"));
        const logOut = await axios.delete(`/api/users/logOut?token=${localData.token}`);
        localStorage.setItem("sessionSaved", JSON.stringify("no session"))
        localStorage.setItem("cartItems", JSON.stringify(""))

        dispatch({ type: user.CLEAR_USER_DATA})
    }
}

// Tools


export  function handleFavorites(userId, productId) {
    return async function () {
        try {
            await axios.put("/api/users/favorites", { userId: userId, productId: productId })
        }
        catch (error) {
        console.error(error)    
        }
    }}

export function getFavorites (userID) {
    return async function(dispatch) {
        try {
            const localData = JSON.parse(localStorage.getItem("sessionSaved"));
            axios.get(`/api/users/favorites?token=${localData.token}&userID=${userID}`)
            .then((r) => dispatch({ type: user.GET_FAVORITES, payload: r.data }))

        } catch (error) {
            console.error(error)    
        }
    }
}

// ADMIN users actions

export function findUser(nickname) {
    
}
