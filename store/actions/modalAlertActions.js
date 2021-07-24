import { modalAlert } from "../types";


export const showModalAlert=  ( payload )=> {
    
    return function (dispatch){
        dispatch({type: modalAlert.SHOW_HIDE_MODAL_ALERT, payload: payload})
    }
}
export const closeModalAlert = ()=> {
    return function (dispatch){
        dispatch({type: modalAlert.CLOSE_MODAL_ALERT})
    }
   
}