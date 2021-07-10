import productReducer from './productReducer';
import userReducer from './userReducer';
import categoriesReducer from './categoriesReducer';
import stylesReducer from './stylesReducer';
import { combineReducers } from "redux";

export default combineReducers({
    product: productReducer,
    user: userReducer,
    category: categoriesReducer,
    styles: stylesReducer
})