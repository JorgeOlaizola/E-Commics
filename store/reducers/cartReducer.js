import { cart } from "../types";

const initialState = {
    cartItems: [],
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case cart.VERIFIED:
            return {
                cartItems: action.payload,
            };
        case cart.ADD_ITEM:
            const itemsAdd = state.cartItems.slice();
            let itemInCart = false;

            itemsAdd.forEach((item) => {
                if (item._id === action.payload._id) {
                    if (item.quantity < item.stock) item.quantity += 1;
                    itemInCart = true;
                }
            });

            if (!itemInCart) {
                itemsAdd.push({ ...action.payload, quantity: 1 });
            }

            localStorage.setItem("cartItems", JSON.stringify(itemsAdd));

            return {
                cartItems: itemsAdd,
            };
        case cart.REMOVE_ITEM:
            const itemsRemove = state.cartItems.slice();
            const newItems = itemsRemove.filter(
                (item) => item._id !== action.payload
            );

            localStorage.setItem("cartItems", JSON.stringify(newItems));

            return {
                cartItems: newItems,
            };
        case cart.INCREASE_ITEM:
            const itemsIncrease = state.cartItems.slice();

            itemsIncrease.forEach((item) => {
                if (item._id === action.payload && item.quantity < item.stock) {
                    item.quantity += 1;
                }
            });

            localStorage.setItem("cartItems", JSON.stringify(itemsIncrease));

            return {
                cartItems: itemsIncrease,
            };
        case cart.DECREASE_ITEM:
            const itemsDecrease = state.cartItems.slice();
            let currentQuantity = 0;
            
            itemsDecrease.forEach((item) => {
                if (item._id === action.payload) {
                    currentQuantity = item.quantity;
                }
            });

            if (currentQuantity > 0) {
                itemsDecrease.forEach((item) => {
                    if (item._id === action.payload) {
                        item.quantity -= 1;
                    }
                });

                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(itemsDecrease)
                );

                return {
                    cartItems: itemsDecrease,
                };
            } else {
                const filterRemove = itemsDecrease.filter(
                    (item) => item._id !== action.payload
                );

                localStorage.setItem("cartItems", JSON.stringify(filterRemove));

                return {
                    cartItems: filterRemove,
                };
            }
        case cart.EMPTY_CART:
            return {
                cartItems: [],
            };
        default:
            return state;
    }
}
