import {FETCH_PRODUCTS_LOAD} from "../constants/product";
import {CHECKOUT_LOAD, SUBMIT_ORDER_REJECTED, SUBMIT_ORDER_OK, FETCH_CHECKOUT_FIELDS_OK, FETCH_CHECKOUT_FIELDS_REJECTED, FETCH_SHIPPING_METHODS_REJECTED, FETCH_SHIPPING_METHODS_OK} from "../constants/checkout";

export function checkoutFields(state =
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
        case FETCH_CHECKOUT_FIELDS_OK: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: null
            }
        }
        case FETCH_CHECKOUT_FIELDS_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        default: {
            return {...state}
        }
    }
}


export function shippingMethods(state =
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
        case FETCH_SHIPPING_METHODS_OK: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: null
            }
        }
        case FETCH_SHIPPING_METHODS_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        default: {
            return {...state}
        }
    }
}

export function submit(state =
                                    {
                                        data: null,
                                        fetching: false,
                                        fetched: false,
                                        error: null
                                    }
    , action) {

    switch (action.type) {
        case CHECKOUT_LOAD: {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }
        case SUBMIT_ORDER_OK: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: null
            }
        }
        case SUBMIT_ORDER_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        default: {
            return {...state}
        }
    }
}
