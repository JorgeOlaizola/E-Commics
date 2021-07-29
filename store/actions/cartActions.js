import { cart } from "../types";
import axios from 'axios'

export function verificationCart() {
    return (dispatch) => {
        try {
            const localItems = JSON.parse(localStorage.getItem("cartItems"));
            if (localItems.length) {
                dispatch({
                    type: cart.VERIFIED,
                    payload: localItems,
                });
            }
        } catch {
            console.error("Error Cart");
        }
    };
}
export function setShippingInfo(payload){

    return {
        type: cart.SET_SHIPPING_INFO,
        payload
    }
}

export function addItem(product) {
    return (dispatch) => {
        dispatch({
            type: cart.ADD_ITEM,
            payload: {
                userId: product.user._id,
                product: {
                    _id: product._id,
                    unit_price: product.price,
                    title: product.title,
                    image: product.image,
                    stock: product.stock
                },
            },
        });
    };
}

export function getCart (userID) {
    return  (dispatch) => {
        if(userID){
            axios.get(`/api/cart?user=${userID}`)
            .then(r => {
                if(r.data.error_msg){
                    
                }
                else{
                    return dispatch({ type: cart.GET_CART, payload: r.data[0]})}
                }
                )
        }
      
    }
}

export function changeCart (userID, cartLE) {
    return  (dispatch) => {
        axios.put(`/api/cart`, { user: userID, cart: cartLE })
        .then(r => {
            return dispatch({ type: cart.GET_CART, payload: r.data })})
    }
}

export function buyCart (cartId, shippingInfo) {
    return  (dispatch) => {
        axios.post(`/api/checkout?id=${cartId}`, {shippingInfo})
        .then((r)=>{
            console.log(r.data)
           return  dispatch({ type: cart.BUY, payload: r.data.buy })

        })
        .catch((e)=>{
            console.log(e)
        })
    }
}
export function buyProduct ({user,product,quantity}) {
    return  (dispatch) => {
        axios.post(`/api/checkout/oneProduct`,{user,quantity,product})
        .then((r)=>{
           return  dispatch({ type: cart.BUY, payload: r.data.buy })

        })
        .catch((e)=>{
            console.log(e)
        })
    }
}


export function removeItem(userId, productId) {
    return (dispatch) => {
        dispatch({
            type: cart.REMOVE_ITEM,
            payload: {
                userId,
                productId
            }
        });
    };
}

export function increaseItem(userId, productId, stock) {
    return (dispatch) => {
        dispatch({
            type: cart.INCREASE_ITEM,
            payload: {
                userId,
                productId,
                stock
            }
        });
    };
}

export function decreaseItem(userId, productId) {
    return (dispatch) => {
        dispatch({
            type: cart.DECREASE_ITEM,
            payload: {
                userId,
                productId
            }
        });
    };
}

export function emptyCart() {
    return (dispatch) => {
        dispatch({
            type: cart.EMPTY_CART
        })
    }
}
