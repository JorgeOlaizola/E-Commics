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
            payload: {
                userId: product.user._id,
                product: {
                    _id: product._id,
                    price: product.price,
                    title: product.title
                },
                stock: product.stock
            },
        });
    };
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
