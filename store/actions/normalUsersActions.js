import {user} from '../types';
import axios from 'axios';

export function getUserData() {
    return async function(dispatch) {
        const userData = await axios.get(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/users`);
        dispatch({ type: user.GET_USER_DATA, payload: userData.data })
    }
}

export function register() {
    
}

export function signIn(data) {
    return async function(dispatch) {
        await axios.post(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/users/logIn`, data);
        const userData = await axios.get(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/users`);
        dispatch({ type: user.GET_USER_DATA, payload: userData.data })
    }
}

export function signOut() {
    return async function(dispatch) {
        const signOut = await axios.get(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/users/logOut`);
        dispatch({ type: user.CLEAR_USER_DATA})
    }
}