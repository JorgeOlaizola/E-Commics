import { product, filter } from '../types'
import axios from 'axios'
import Filters from '../../components/Filters'


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

export function resetProductDetail () {
    return (dispatch) => {
        dispatch({ type: product.RESET_PRODUCT_DETAIL})
    }
}

export function addSellingProduct (product) {
    return () => {
        const addProduct = axios.post(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/products`, product);
    }
}

//Filters

export function searchByName (search) {
    const string = {
        in: "title",
        text: search
    }
    return (dispatch) => {
        return dispatch({ type: filter.SEARCH_BY_NAME, payload: string})
    }
}

export function searchByCategory (category) {
    return(dispatch) => {
        return dispatch({ type: filter.SEARCH_BY_CATEGORY, payload: category })
    }
}

export function searchByPrice (min, max) {
    const price = {
        start: min,
        end: max
    }
    return (dispatch) => {
        return dispatch({ type: filter.SEARCH_BY_PRICE, payload: price})
    }
}

export function searchByScore (min, max) {
    const score = {
        start: min,
        end: max
    }
    return (dispatch) => {
        return dispatch({ type: filter.SEARCH_BY_SCORE, payload: score})
    }
}

export function searchByUser (userId) {
    return (dispatch) => {
        return dispatch({ type: filter.SEARCH_BY_USER, payload: userId})
    }
}

export function searchByOrder(order){
    return (dispatch) => {
        return dispatch({ type: filter.SEARCH_BY_ORDER, payload: order})
    }
}

export function setPage(page) {
    return (dispatch) => {
        return dispatch ({ type: filter.SET_PAGE, payload: page})
    }
}

//Reset filters

export function resetFilters() {
    var oldFilters = {
        user : "",
        category: "",
        score : {
            start: 0,
            end: 0
        },
        price : {
            start: 0,
            end: 0
        },
        search:{
            in: "title",
            text: ""
        },
        order:{
            in: "",
            or: 1
        },
        page: 1
    }
    return (dispatch) => {
        dispatch({ type: filter.RESET_FILTERS, payload: oldFilters})
    }
}

//Get products with filters

export function getFilteredProducts (payload) {
    return(dispatch) => {
        axios.post(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/products/get`, payload)
        .then(r => dispatch({ type: filter.GET_FILTERING_PRODUCTS, payload: r.data }))
    }
}