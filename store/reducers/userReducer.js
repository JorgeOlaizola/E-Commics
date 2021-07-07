import { user } from '../types';

const initialState = {
    userData: {log: false},
    sellingProducts: [],
    boughtProducts: [],
    soldProducts: []
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
                ...state,
                userData: {log: false}
            }
        default:
            return state;
    }
}