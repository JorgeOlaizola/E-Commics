import {modalAlert} from '../types'


const initialState = {
    show: false,
    message: ''
}


export default function modalAlertReducer (state=initialState, action){
    switch (action.type) {
        case modalAlert.SHOW_HIDE_MODAL_ALERT:
            return {
                ...state,
                show: action.payload.show,
                message: action.payload.message

            }
            break;
        case modalAlert.CLOSE_MODAL_ALERT:
            return {
                ...state,
                show: false,
                message: ""
    
                }
                break;
            
    
        default:
            return state;
            break;
    }
} 