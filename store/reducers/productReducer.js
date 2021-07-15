import { product, filter } from '../types';

const initialState = {
    products: [],
    productDetail: {},
    filters: {
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
}

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        //Product reducer
        case product.GET_PRODUCTS:
        return {...state, products: action.payload}
        case product.GET_PRODUCTS_BY_USER:
        return {...state, products: action.payload}
        case product.GET_PRODUCT_DETAIL:
        return {...state, productDetail: action.payload}
        //Reset product detial
        case product.RESET_PRODUCT_DETAIL:
        return {...state, productDetail: {}}
        //Questions reducer
        case product.CREATE_QUESTION:
        return {...state, productDetail: {...state.productDetail, questions: state.productDetail.questions.concat([action.payload])}}
        //Filter reducer
        case filter.SEARCH_BY_NAME:
        return {...state, filters: {...state.filters, search: action.payload}}
        case filter.SEARCH_BY_CATEGORY:
        return {...state, filters: {...state.filters, category: action.payload}}
        case filter.SEARCH_BY_PRICE_MIN:
        return {...state, filters: {...state.filters, price: {...state.filters.price, start: action.payload}}}
        case filter.SEARCH_BY_PRICE_MAX:
            return {...state, filters: {...state.filters, price: {...state.filters.price, end: action.payload}}}
        case filter.SEARCH_BY_SCORE:
        return {...state, filters: {...state.filters, score: action.payload}}
        case filter.SEARCH_BY_USER:
        return {...state, filters: {...state.filters, user: action.payload}}
        case filter.SEARCH_BY_ORDER:
        return state
        case filter.SET_PAGE:
        return {...state, filters: {...state.filters, page: action.payload}}
        //Reset filters
        case filter.RESET_FILTERS:
        return {...state, filters: action.payload}
        //Get filtered products
        case filter.GET_FILTERING_PRODUCTS:
        return {...state, products: action.payload}
        default:
        return state;
    }
}