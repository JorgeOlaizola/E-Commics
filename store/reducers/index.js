import productReducer from './productReducer';
import userReducer from './userReducer';
import categoriesReducer from './categoriesReducer';
import stylesReducer from './stylesReducer';
import cartReducer from './cartReducer';
import modalAlertReducer from './modalAlertReducer';
import newsletterReducer from './newsletterReducer';
import { combineReducers } from "redux";

export default combineReducers({
    product: productReducer,
    user: userReducer,
    category: categoriesReducer,
    styles: stylesReducer,
    cart: cartReducer,
    modalAlert: modalAlertReducer,
    newsletter: newsletterReducer
})
