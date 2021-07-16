import { category } from '../types'
import axios from 'axios'


export function getCategories () {
    return (dispatch) => {
    axios.get(`/api/categories`)
    .then(r => dispatch({ type: category.GET_CATEGORIES, payload: r.data }))
    }
}

// ADMIN categories actions

export function deleteCategory (id) {
    return () => {
        axios.delete(`/api/categories?id=${id}`)
        .then(r => console.log(r.data))
    }
}

export function updateCategory(id, title) {
    return () => {
        axios.put(`/api/categories?id=${id}&title=${'Cambio de title'}`,)
        .then(r => console.log(r.data))
    }
}

export function addCategory(title) {
    return() => {
        axios.post(`/api/categories?title=${title}`,)
        .then(r => console.log(r.data))
    }
}