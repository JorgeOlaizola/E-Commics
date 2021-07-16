import productReducer from './productReducer';
import userReducer from './userReducer';
import categoriesReducer from './categoriesReducer';
import stylesReducer from './stylesReducer';
import cartReducer from './cartReducer';
import { combineReducers } from "redux";

export default combineReducers({
    product: productReducer,
    user: userReducer,
    category: categoriesReducer,
    styles: stylesReducer,
    cart: cartReducer
})