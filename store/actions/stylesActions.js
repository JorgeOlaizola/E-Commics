import {styles} from '../types';


export function themeToggle() {
    return function(dispatch) {
        
        dispatch({ type: styles.TOGGLE_THEME })
    }
}

export function showHideModal(trueorfalse) {
    
    return function(dispatch) {
        dispatch({ type: styles.SHOW_HIDE_MODAL, payload: trueorfalse })
    }
}