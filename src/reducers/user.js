import {
    FETCH_ORDER_ITEMS_OK,
    FETCH_ORDER_ITEMS_REJECTED,
    FETCH_ORDERS_OK,
    FETCH_ORDERS_REJECTED,
    LOGIN_OK,
    LOGIN_REJECTED,
    USER_LOAD,
    FETCH_ORDERS_LOAD,
    FETCH_ORDER_ITEMS_LOAD
} from "../constants/user";

export function loginData(state =
                              {
                                  data: null,
                                  fetching: false,
                                  fetched: false,
                                  error: false
                              }
    , action) {

    switch (action.type) {
        case USER_LOAD: {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }
        case LOGIN_OK: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: false
            }
        }
        case LOGIN_REJECTED: {
            return {...state, fetching: false, error: true, data: null}
        }
        default: {
            return {...state}
        }
    }
}


export function userOrders(state =
                               {
                                   data: [],
                                   fetching: false,
                                   fetched: false,
                                   error: false
                               }
    , action) {

    switch (action.type) {
        case FETCH_ORDERS_LOAD: {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }
        case FETCH_ORDERS_OK: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: false
            }
        }
        case FETCH_ORDERS_REJECTED: {
            return {...state, fetching: false, error: true, data: []}
        }
        default: {
            return {...state}
        }
    }
}


export function orderItems(state =
                               {
                                   data: [],
                                   fetching: false,
                                   fetched: false,
                                   error: false
                               }
    , action) {

    switch (action.type) {
        case FETCH_ORDER_ITEMS_LOAD: {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }
        case FETCH_ORDER_ITEMS_OK: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: false
            }
        }
        case FETCH_ORDER_ITEMS_REJECTED: {
            return {...state, fetching: false, error: true, data: []}
        }
        default: {
            return {...state}
        }
    }
}
