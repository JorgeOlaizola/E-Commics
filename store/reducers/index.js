import productReducer from './productReducer';
import userReducer from './userReducer';
import categoriesReducer from './categoriesReducer'
import { combineReducers } from "redux";

export default combineReducers({
    product: productReducer,
    user: userReducer,
    category: categoriesReducer
})