import { user } from '../types';

const initialState = {
    userData: {log: false},
    sellingProducts: [],
    boughtProducts: [],
    soldProducts: [],
    buyerOrders: [],
    sellerOrders: []
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case user.GET_USER_DATA:
            return {
                ...state,
                userData: action.payload
            }
        case user.CLEAR_USER_DATA:
            return {
                userData: {log: false}
            }
        //Favorites
        case user.GET_FAVORITES:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    user: {
                        ...state.userData.user,
                        favorites: action.payload
                    }
                }
            }
        case 'buyer':
            return {
                ...state,
                buyerOrders: action.payload
            }
        case 'seller':
            return {
                ...state,
                sellerOrders: action.payload
            }
        default:
            return state;
    }
}