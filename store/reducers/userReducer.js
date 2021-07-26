import { user } from '../types';

const initialState = {
    userData: {log: false},
    buyerOrders: [],
    sellerOrders: [],
    confirmation: [],
    passReset: [],
    passTokenCheck: [],
    locations: []
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
        case user.USER_CONFIRMATION:
            return {
                ...state,
                confirmation: action.payload
            }
        case user.PASSWORD_RESET:
            return {
                ...state,
                passReset: action.payload
            }
        case user.CHECK_TOKEN:
            return {
                ...state,
                passTokenCheck: action.payload
            }
        case user.GET_LOCATIONS:
            return {
                ...state,
                locations: action.payload
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