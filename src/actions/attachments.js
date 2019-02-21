import axios from "axios/index";
import {WP_ENDPOINT} from "../../app.cofig";
import {FETCH_LOAD} from "../constants/common";
import {FETCH_IMAGES_OK, FETCH_IMAGES_REJECTED} from "../constants/attachments";

const IMAGES_PATH = "images";

export const getImagesByIds = (ids) => (dispatch) => {
    dispatch({type: FETCH_LOAD});

    let requestObj = {
        ids: ids
    };

    return axios.post([WP_ENDPOINT, IMAGES_PATH].join("/"), requestObj)
        .then((res) => {
            dispatch({type: FETCH_IMAGES_OK, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_IMAGES_REJECTED, payload: err.response})
        })

};
