import { product } from '../types';

const initialState = {
    products: []
}

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case product.GET_PRODUCTS:
        return {...state, products: action.payload}
        default:
        return state;
    }
}