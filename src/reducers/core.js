import {CORE_LOAD, LINKS_OK, LINKS_REJECTED} from "../constants/core";

export function links(state =
                          {
                              data: null,
                              fetching: false,
                              fetched: false,
                              error: false
                          }
    , action) {

    switch (action.type) {
        case CORE_LOAD: {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }
        case LINKS_OK: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: false
            }
        }
        case LINKS_REJECTED: {
            return {...state, fetching: false, error: true, data: null}
        }
        default: {
            return {...state}
        }
    }
}

