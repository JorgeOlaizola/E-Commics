import { product } from '../types';

const initialState = {
    products: [],
    productDetail: {}
}

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case product.GET_PRODUCTS:
        return {...state, products: action.payload}
        case product.GET_PRODUCT_DETAIL:
        return {...state, productDetail: action.payload}
        default:
        return state;
    }
}