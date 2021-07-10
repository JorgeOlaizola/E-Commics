import {styles} from '../types';


export function themeToggle() {
    return function(dispatch) {
        
        dispatch({ type: styles.TOGGLE_THEME })
    }
}