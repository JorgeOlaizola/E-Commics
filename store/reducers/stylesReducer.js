import { styles } from '../types';

const initialState = {
    theme: "light"
    , themeDark: "dark",
    modal: false
}

// export default function stylesReducer(state = initialState, action) {
//     switch (action.type) {
//         case styles.TOGGLE_THEME:
//             return {
//                 ...state,
//                 theme: action.payload
//             }
//         default:
//             return state;
//     }
// }

// export default function stylesReducer(state = initialState, action) {
//     switch (action.type) {
//         case styles.TOGGLE_THEME:
//             return {
//                 ...state,
//                 theme: state.themeDark
//             }
//         default:
//             return state;
//     }
// }

export default function stylesReducer(state = initialState, action) {
    switch (action.type) {
        case styles.TOGGLE_THEME:
            return {
                ...state,
                theme: state.theme === "light" ? "dark" : "light"
            }
        case styles.SHOW_HIDE_MODAL:
            return {
                ...state,
                modal: action.payload
            }
        default:
            return state;
    }
}
