import { newsletter } from "../types";

const initialState = {
    newsletters: undefined,
    newsletter: {},
    updateNewsletter: {},
};

export default function newsletterReducer(state = initialState, action) {
    switch (action.type) {
        case newsletter.GET_NEWSLETTERS:
            return {
                ...state,
                newsletters: action.payload,
            };
        case newsletter.UPDATE_NEWSLETTERS:
            return {
                ...state,
                updateNewsletter: action.payload,
            };
        case newsletter.GET_NEWSLETTER_DETAIL:
            return {
                ...state,
                newsletter: action.payload,
            };
        default:
            return state;
    }
}
