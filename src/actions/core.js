import axios from "axios/index";
import {WP_ENDPOINT} from "../../app.cofig";

import {CORE_LOAD, LINKS_OK, LINKS_REJECTED} from "../constants/core";

export const getLinks = () => (dispatch) => {
    dispatch({type: CORE_LOAD});

    return axios.get([WP_ENDPOINT, "links"].join("/"))
        .then((res) => {
            dispatch({type: LINKS_OK, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: LINKS_REJECTED, payload: err.response})
        })

};
