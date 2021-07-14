import { category } from '../types'
import axios from 'axios'


export function getCategories () {
    return (dispatch) => {
    axios.get(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/categories/get`)
    .then(r => dispatch({ type: category.GET_CATEGORIES, payload: r.data }))
    }
}