import {FETCH_IMAGES_OK, FETCH_IMAGES_REJECTED} from "../constants/attachments";
import {FETCH_LOAD} from "../constants/common";

export function images(state =
                           {
                               data: null,
                               fetching: false,
                               fetched: false,
                               error: null
                           }
    , action) {

    switch (action.type) {
        case FETCH_LOAD: {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }
        case FETCH_IMAGES_OK: {
            const images = action.payload.map((img) => img[0]);
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: images,
                error: null
            }
        }
        case FETCH_IMAGES_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        default: {
            return {...state}
        }
    }
}
