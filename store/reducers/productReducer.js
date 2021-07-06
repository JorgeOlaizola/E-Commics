import { product } from '../types';

const initialState = {
}

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case product.ADDPRODUCT:
        return state;
        default:
        return state;
    }
}