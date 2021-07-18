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
            const addItems = state.cartItems.slice();
            let userInOrder = false;
            let itemInCart = false;

            addItems.forEach((order) => {
                if (order._id === action.payload.userId) {
                    userInOrder = true;
                    order.products.forEach((item) => {
                        if (item._id === action.payload.product._id) {
                            if (item.quantity < action.payload.stock) {
                                item.quantity += 1;
                                itemInCart = true;
                            }
                        } else {
                            order.products.push({
                                ...action.payload.product,
                                quantity: 1,
                            });
                        }
                    });
                }
            });

            if (!userInOrder) {
                addItems.push({
                    _id: action.payload.userId,
                    products: [
                        {
                            ...action.payload.product,
                            quantity: 1,
                        },
                    ],
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(addItems));

            return {
                cartItems: addItems,
            };
        case cart.REMOVE_ITEM:
            const itemsRemove = state.cartItems.slice();
            itemsRemove.forEach((order, i) => {
                if (order._id === action.payload.userId) {
                    order.products = order.products.filter(
                        (item) => item._id !== action.payload.productId
                    );
                }
                if (!order.products.length) {
                    itemsRemove.splice(i, 1);
                }
            });
            localStorage.setItem("cartItems", JSON.stringify(itemsRemove));

            return {
                cartItems: itemsRemove,
            };
        case cart.INCREASE_ITEM:
            const itemsIncrease = state.cartItems.slice();

            itemsIncrease.forEach((order) => {
                if (order._id === action.payload.userId) {
                    order.products.forEach((item) => {
                        if (
                            item._id === action.payload.productId &&
                            item.quantity < action.payload.stock
                        )
                            item.quantity += 1;
                    });
                }
            });

            localStorage.setItem("cartItems", JSON.stringify(itemsIncrease));

            return {
                cartItems: itemsIncrease,
            };
        case cart.DECREASE_ITEM:
            const itemsDecrease = state.cartItems.slice();
            let currentQuantity = 0;

            itemsDecrease.forEach((order, i) => {
                if (order._id === action.payload.userId) {
                    order.products.forEach((item, i) => {
                        if (item._id === action.payload.productId) {
                            item.quantity > 1
                                ? (item.quantity -= 1)
                                : order.products.splice(i, 1);
                        }
                    });
                }
                if (!order.products.length) {
                    itemsDecrease.splice(i, 1);
                }
            });

            localStorage.setItem("cartItems", JSON.stringify(itemsDecrease));

            return {
                cartItems: itemsDecrease,
            };
        case cart.EMPTY_CART:
            localStorage.setItem("cartItems", JSON.stringify([]));

            return {
                cartItems: [],
            };
        default:
            return state;
    }
}
