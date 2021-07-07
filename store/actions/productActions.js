import { product } from '../types'
import axios from 'axios'


export function getProducts (payload) {
    return (dispatch) => {
    axios.get(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/products`)
    .then(r => dispatch({ type: product.GET_PRODUCTS, payload: r.data }))
    }
}

export function addProduct (payload) {
}