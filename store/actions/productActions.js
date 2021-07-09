import { product } from '../types'
import axios from 'axios'


export function getProducts (payload) {
    return (dispatch) => {
    axios.get(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/products`)
    .then(r => dispatch({ type: product.GET_PRODUCTS, payload: r.data }))
    }
}

export function getProductDetail (id) {
    return (dispatch) => {
    axios.get(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/products/product?id=${id}`)
    .then(r => dispatch({ type: product.GET_PRODUCT_DETAIL, payload: r.data }))
    }
}


export function addSellingProduct (product) {
    return () => {
        const addProduct = axios.post(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/products`, product);
    }
}