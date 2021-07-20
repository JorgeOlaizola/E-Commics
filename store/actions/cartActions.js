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
        axios.get(`/api/cart?user=${userID}`)
        .then(r => {
            return dispatch({ type: cart.GET_CART, payload: r.data[0]})})
    }
}

export function changeCart (userID, cartLE) {
    return  (dispatch) => {
        axios.put(`/api/cart`, { user: userID, cart: cartLE })
        .then(r => {
            return dispatch({ type: cart.GET_CART, payload: r.data })})
    }
}

export function buyCart (cartId) {
    return  (dispatch) => {
        axios.post(`/api/checkout?id=${cartId}`)
        .then((r)=>{
            console.log(r.data)
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
