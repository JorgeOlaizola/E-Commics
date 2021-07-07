import { category } from '../types';

const initialState = {
    categories: []
}

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case category.GET_CATEGORIES:
        return {...state, categories: action.payload}
        default:
        return state;
    }
}