import {FETCH_PRODUCTS_OK, FETCH_PRODUCTS_REJECTED} from "../constants/product";

export function products(state =
                             {
                                 data: null,
                                 fetching: false,
                                 fetched: false,
                                 error: null
                             }
    , action) {

    switch (action.type) {
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
