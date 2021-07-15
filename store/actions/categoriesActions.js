import { category } from '../types'
import axios from 'axios'


export function getCategories () {
    return (dispatch) => {
    axios.get(`/api/categories/get`)
    .then(r => dispatch({ type: category.GET_CATEGORIES, payload: r.data }))
    }
}