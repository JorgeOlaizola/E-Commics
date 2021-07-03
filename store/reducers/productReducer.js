import { products } from '../types';

const initialState = {
}

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case products.ADDPRODUCT:
        return state;
        default:
        return state;
    }
}