import productReducer from './productReducer';
import userReducer from './userReducer';
import { combineReducers } from "redux";

export default combineReducers({
    product: productReducer,
    user: userReducer
})