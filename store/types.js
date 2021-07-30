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
    GET_TITLES:'GET_TITLES',
    //Questions types
    CREATE_QUESTION: 'CREATE_QUESTION'
}

//Types USER
export const user = {
    GET_USER_DATA: 'GET_USER_DATA',
    CLEAR_USER_DATA: 'CLEAR_USER_DATA',
    GET_FAVORITES: 'GET_FAVORITES',
    USER_CONFIRMATION: 'USER_CONFIRMATION',
    PASSWORD_RESET: 'PASSWORD_RESET',
    CHECK_TOKEN: 'CHECK_TOKEN',
    GET_LOCATIONS: 'GET_LOCATIONS',
    DELETE_NOTIFICATION:'DELETE_NOTIFICATION',
    GET_NOTIFICATIONS:'GET_NOTIFICATIONS'
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
    SEARCH_BY_SCORE_MIN: 'SEARCH_BY_SCORE_MIN',
    SEARCH_BY_SCORE_MAX: 'SEARCH_BY_SCORE_MAX',
    SEARCH_BY_USER: 'SEARCH_BY_USER',
    SEARCH_BY_ORDER: 'SEARCH_BY_ORDER',
    GET_FILTERING_PRODUCTS: 'GET_FILTERING_PRODUCTS',
    SET_PAGE: 'SET_PAGE',
    RESET_FILTERS: 'RESET_FILTERS',
    GET_OWN_PRODUCTS: 'GET_OWN_PRODUCTS'
}

// Types STYLES

export const styles = {
    TOGGLE_THEME: "TOGGLE_THEME",
    SHOW_HIDE_MODAL: "SHOW_HIDE_MODAL"
}

// Types CART

export const cart = {
    ADD_ITEM: 'ADD_ITEM',
    GET_CART: 'GET_CART',
    REMOVE_ITEM: 'REMOVE_ITEM',
    INCREASE_ITEM: 'INCREASE_ITEM',
    DECREASE_ITEM: 'DECREASE_ITEM',
    EMPTY_CART: 'EMPTY_CART',
    VERIFIED: 'VERIFIED',
    BUY:'BUY',
    SET_SHIPPING_INFO:'SET_SHIPPING_INFO'
}

//Types ADMIN

export const admin = {
    
}

//Types ModalAlert

export const modalAlert = {
    SHOW_HIDE_MODAL_ALERT: "SHOW_HIDE_MODAL_ALERT",
    CLOSE_MODAL_ALERT : "CLOSE_MODAL_ALERT"

}

//Newsletters Types

export const newsletter = {
    GET_NEWSLETTERS: "GET_NEWSLETTERS",
    UPDATE_NEWSLETTERS: "UPDATE_NEWSLETTERS",
    GET_NEWSLETTER_DETAIL: 'GET_NEWSLETTER_DETAIL'
}