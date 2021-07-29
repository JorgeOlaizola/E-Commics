import {user} from '../types';
import axios from 'axios';
import {loginWithGitHub, onCloseSession} from '../../firebase/client'


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

export function signIn(userData, cart) {
    return async function(dispatch) {
        try {
            //const userData = await axios.post(`/api/users/logIn`, info);
            
            if(userData.user.id && cart){
               
               const carrito = await axios.put(`/api/cart`, { user: userData.user.id, cart: cart })
               
               localStorage.setItem("cartItems", JSON.stringify([]));
            }
            localStorage.setItem("sessionSaved", JSON.stringify(userData))
            dispatch({ type: user.GET_USER_DATA, payload: userData })
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
        onCloseSession().then(r => console.log(r)).catch(err=> console.log(err))
        dispatch({ type: user.CLEAR_USER_DATA})
    }
}

export function resetPassword(user) {
    const data = {
        email: user
    }
    return async function() {
        try {
            const response = await axios.post('/api/users/resetPassword', data);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
}

export function setNewPassword(token, password) {
    const data = {
        email: token,
        password: password
    }
    return async function() {
        await axios.post('/api/users/setNewPassword', data)
        .then((r) => dispatch({ type: user.PASSWORD_RESET, payload: r.data }))
        .catch((error) => {console.log(error)})
    }
}

export function checkToken(arg) {
    const data = {
        token: arg
    }
    return async function() {
        await axios.post('/api/users/checkToken', data)
        .then((r) => dispatch({ type: user.CHECK_TOKEN, payload: r.data }))
        .catch((error) => {console.log(error)})
    }
}

export function confirmUser(arg) {
    const data = {
        token: arg
    }
    return async function(dispatch) {
        axios.post('/api/users/confirm', data)
        .then((r) => dispatch({ type: user.USER_CONFIRMATION, payload: r.data }))
        .catch((error) => {console.log(error)})
    }
}

export function getLocations() {
    return async function(dispatch) {
        const response = await axios.get('/api/locations/')
        dispatch({ type: user.GET_LOCATIONS, payload: response.data })
    }
}

// Tools


export function handleFavorites(userId, productId) {
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

//Orders

export function updateOrders (orderId, status, userId) {
    return function(dispatch) {
        axios.put('/api/orders', {orderId, status, userId})
        .then((r) => console.log(r.data))
    }
}

export function getOrders (eachCase, userId, filter) {
    return async function(dispatch) {
        try{
            let type = ""
            if(eachCase === "seller") type = 'seller'
            if(eachCase === "buyer") type = 'buyer'
            axios.get(`/api/orders?eachCase=${eachCase}&userId=${userId}&filter=${filter || ''}`)
            .then( r => dispatch({ type: type, payload: r.data }))
        }
        catch (error) {
            console.error(error)  
        }
    }
}

// Notifications

export function getNotifications (userId) {
    return async function(dispatch) {
        try{
            //Trae las notificaciones de la base de datos actualizadas, hay que actualizar userData
            axios.get(`/api/users/notifications?userId=${userId}`)
            .then(r => console.log(r.data))
        }
        catch (error) {
            console.error(error)  
        }
    }
}

export function deleteNotification (userId, notificationId) {
    return async function(dispatch){
        try{
            //Le enviamos un ID de notificación de la base de datos y devuelve el arreglo sin esa notificación
            await axios.put(`/api/users/notifications?userId=${userId}&notificationId=${notificationId}`)
            .then(r => dispatch({type:user.DELETE_NOTIFICATION, payload:r.data}))
        }
        catch (error) {
            console.error(error)  
        }
    }
}

