//Types PRODUCT

export const product = {
    GET_PRODUCTS: 'GET_PRODUCTS',
    GET_PRODUCT_DETAIL: 'GET_PRODUCT_DETAIL',
    RESET_PRODUCT_DETAIL: 'RESET_PRODUCT_DETAIL',
    ADD_SELLING_PRODUCT: 'ADD_SELLING_PRODUCT',
    DELETE_SELLING_PRODUCT: 'DELETE_SELLING_PRODUCT',
    MODIFY_SELLING_PRODUCT: 'MODIFY_SELLING_PRODUCT',
    GET_SELLING_PRODUCT: 'GET_SELLING_PRODUCT',
    GET_BOUGHT_PRODUCT: 'GET_BOUGHT_PRODUCT',
    GET_SOLD_PRODUCT: 'GET_SOLD_PRODUCT',
    GET_PRODUCTS_BY_USER: 'GET_PRODUCTS_BY_USER',
    //Questions types
    CREATE_QUESTION: 'CREATE_QUESTION'
}

//Types USER
export const user = {
    GET_USER_DATA: 'GET_USER_DATA',
    CLEAR_USER_DATA: 'CLEAR_USER_DATA',
    HANDLE_FAVORITES: 'HANDLE_FAVORITES'
}

//Types CATEGORY
export const category = {
    GET_CATEGORIES: 'GET_CATEGORIES'
}

//Types FILTER

export const filter = {
    SEARCH_BY_NAME: 'SEARCH_BY_NAME',
    SEARCH_BY_CATEGORY: 'SEARCH_BY_CATEGORY',
    SEARCH_BY_PRICE_MIN: 'SEARCH_BY_PRICE_MIN',
    SEARCH_BY_PRICE_MAX: 'SEARCH_BY_PRICE_MAX',
    SEARCH_BY_SCORE: 'SEARCH_BY_SCORE',
    SEARCH_BY_USER: 'SEARCH_BY_USER',
    SEARCH_BY_ORDER: 'SEARCH_BY_ORDER',
    GET_FILTERING_PRODUCTS: 'GET_FILTERING_PRODUCTS',
    SET_PAGE: 'SET_PAGE',
    RESET_FILTERS: 'RESET_FILTERS'
}

// Types STYLES

export const styles = {
    TOGGLE_THEME: "TOGGLE_THEME",
    SHOW_HIDE_MODAL: "SHOW_HIDE_MODAL"
}

// Types CART

export const cart = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    INCREASE_ITEM: 'INCREASE_ITEM',
    DECREASE_ITEM: 'DECREASE_ITEM',
    EMPTY_CART: 'EMPTY_CART',
    VERIFIED: 'VERIFIED'
}