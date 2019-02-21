import {
    CART_UPDATE_EVENT,
    FETCH_PRODUCTS_LOAD,
    FETCH_PRODUCTS_OK,
    FETCH_PRODUCTS_REJECTED,
    FETCH_SINGLE_PRODUCT_OK,
    FETCH_SINGLE_PRODUCT_REJECTED
} from "../constants/product";

export function products(state =
                             {
                                 data: null,
                                 fetching: false,
                                 fetched: false,
                                 error: null
                             }
    , action) {

    switch (action.type) {
        case FETCH_PRODUCTS_LOAD: {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }
        case FETCH_PRODUCTS_OK: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: null
            }
        }
        case FETCH_PRODUCTS_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        default: {
            return {...state}
        }
    }
}


export function singleProduct(state =
                                  {
                                      data: null,
                                      fetching: false,
                                      fetched: false,
                                      error: null
                                  }
    , action) {

    switch (action.type) {
        case FETCH_PRODUCTS_LOAD: {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }
        case FETCH_SINGLE_PRODUCT_OK: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: null
            }
        }
        case FETCH_SINGLE_PRODUCT_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        default: {
            return {...state}
        }
    }
}

export function cart(state =
                         {
                             data: null
                         }
    , action) {
    switch (action.type) {
        case CART_UPDATE_EVENT: {
            return {
                ...state,
                data: action.payload
            }
        }
        default: {
            return {...state}
        }
    }
}
