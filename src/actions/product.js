import axios from "axios/index";
import {WP_ENDPOINT} from "../../app.cofig";
import {FETCH_PRODUCTS_OK, FETCH_PRODUCTS_REJECTED} from "../constants/product";

const PRODUCTS_PATH = "products";

export const getProdcuts = () => (dispatch) => {
    let requestObj = {
        limit: 10,
        page: 1,
        status: "publish",
        stock_status: "instock"
    };

    return axios.post([WP_ENDPOINT, PRODUCTS_PATH].join("/"), requestObj)
        .then((res) => {
            dispatch({type: FETCH_PRODUCTS_OK, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_PRODUCTS_REJECTED, payload: err.response})
        })

};

