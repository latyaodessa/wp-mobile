import axios from "axios/index";
import {WP_ENDPOINT} from "../../app.cofig";
import {
    FETCH_PRODUCTS_LOAD,
    FETCH_PRODUCTS_OK,
    FETCH_PRODUCTS_REJECTED,
    FETCH_SINGLE_PRODUCT_OK,
    FETCH_SINGLE_PRODUCT_REJECTED
} from "../constants/product";

const PRODUCTS_PATH = "products";
const SINGLE_PRODUCT_PATH = "product";

export const getProdcuts = (limit, page) => (dispatch) => {
    dispatch({type: FETCH_PRODUCTS_LOAD});
    let requestObj = {
        limit: limit,
        page: page,
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

export const getSingleProdcut = (productId) => (dispatch) => {
    dispatch({type: FETCH_PRODUCTS_LOAD});
    return axios.get([WP_ENDPOINT, SINGLE_PRODUCT_PATH, productId].join("/"))
        .then((res) => {
            dispatch({type: FETCH_SINGLE_PRODUCT_OK, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_SINGLE_PRODUCT_REJECTED, payload: err.response})
        })

};

