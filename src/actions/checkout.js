import axios from "axios/index";
import {WP_ENDPOINT} from "../../app.cofig";
import {FETCH_PRODUCTS_LOAD} from "../constants/product";
import {
    FETCH_CHECKOUT_FIELDS_OK,
    FETCH_CHECKOUT_FIELDS_REJECTED,
    FETCH_SHIPPING_METHODS_OK,
    FETCH_SHIPPING_METHODS_REJECTED,
    SUBMIT_ORDER_OK,
    SUBMIT_ORDER_REJECTED,
    CHECKOUT_LOAD
} from "../constants/checkout";
import {getUser} from "./user";

const CHECKOUT_PATH = "checkout";

export const getCheckoutFields = () => (dispatch) => {
    dispatch({type: FETCH_PRODUCTS_LOAD});

    return axios.get([WP_ENDPOINT, CHECKOUT_PATH, "fields"].join("/"))
        .then((res) => {
            dispatch({type: FETCH_CHECKOUT_FIELDS_OK, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_CHECKOUT_FIELDS_REJECTED, payload: err.response})
        })

};

export const getShippingMethods = () => (dispatch) => {
    return axios.post([WP_ENDPOINT, CHECKOUT_PATH, "shipping"].join("/"), {})
        .then((res) => {
            dispatch({type: FETCH_SHIPPING_METHODS_OK, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_SHIPPING_METHODS_REJECTED, payload: err.response})
        })

};

export const submitOrder = (request) => (dispatch) => {
    dispatch({type: CHECKOUT_LOAD});
    return axios.post([WP_ENDPOINT, CHECKOUT_PATH, "submit"].join("/"), request)
        .then((res) => {
            dispatch({type: SUBMIT_ORDER_OK, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: SUBMIT_ORDER_REJECTED, payload: err.response})
        })
};
