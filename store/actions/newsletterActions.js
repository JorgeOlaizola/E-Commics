import { newsletter } from "../types";
import axios from "axios";

export function addNewsletter(newsletter) {
    return (dispatch) => {
        axios.post("/api/newsletter", newsletter);
    };
}

export function getNewsletter() {
    return (dispatch) => {
        axios.get('/api/newsletter').then((response) => {
            console.log(response)
            return dispatch({
                type: newsletter.GET_NEWSLETTERS,
                payload: response.data,
            });
        });
    };
}

export function getNewsletterDetail(id) {
    return (dispatch) => {
        axios.get(`/api/newsletter?id=${id}`).then((response) => {
            dispatch({
                type: newsletter.GET_NEWSLETTER_DETAIL,
                payload: response.data,
            });
        });
    };
}

export function updateNewsletter(id, newsletter) {
    return (dispatch) => {
        axios.put(`/api/newsletter?id=${id}`, newsletter).then((response) => {
            return dispatch({
                type: newsletter.UPDATE_NEWSLETTERS,
                payload: response.data,
            });
        });
    };
}

export function deleteNewsletter(id) {
    return (dispatch) => {
        axios.delete(`/api/newsletter?id=${id}`);
    };
}