import { cart } from "../types";

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
            payload: product,
        });
    };
}

export function removeItem(id) {
    return (dispatch) => {
        dispatch({
            type: cart.REMOVE_ITEM,
            payload: id
        });
    };
}

export function increaseItem(id) {
    return (dispatch) => {
        dispatch({
            type: cart.INCREASE_ITEM,
            payload: id
        });
    };
}

export function decreaseItem(id) {
    return (dispatch) => {
        dispatch({
            type: cart.DECREASE_ITEM,
            payload: id
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
