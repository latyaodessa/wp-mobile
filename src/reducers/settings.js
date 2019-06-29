import {FETCH_API_LOAD, FETCH_API_OK, FETCH_API_REJECTED} from "../constants/settings";

export function api(state =
                        {
                            data: null,
                            fetching: false,
                            fetched: false,
                            error: null
                        }
    , action) {

    switch (action.type) {
        case FETCH_API_LOAD: {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }
        case FETCH_API_OK: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: null
            }
        }
        case FETCH_API_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        default: {
            return {...state}
        }
    }
}
