import {AsyncStorage} from "react-native"
import axios from "axios";
import {WP_ENDPOINT} from "../../app.cofig";
import {
    FETCH_ORDER_ITEMS_LOAD,
    FETCH_ORDER_ITEMS_OK,
    FETCH_ORDER_ITEMS_REJECTED,
    FETCH_ORDERS_LOAD,
    FETCH_ORDERS_OK,
    FETCH_ORDERS_REJECTED,
    LOGIN_OK,
    LOGIN_REJECTED,
    USER_LOAD,
    USER_LOGOUT
} from "../constants/user";

const user_key = 'user';
const local_orders_key = 'local_orders';

const USER_PATH = "user";

export const login = (username, password) => (dispatch) => {
    dispatch({type: USER_LOAD});

    let requestObj = {
        username: username,
        password: password
    };

    return axios.post([WP_ENDPOINT, USER_PATH, "login"].join("/"), requestObj)
        .then((res) => {
            if (res.data.user.errors) {
                dispatch({type: LOGIN_REJECTED, payload: err.response})
            } else {
                setUser(res.data.user);
                // setOrders(res.data.orders);
                dispatch({type: LOGIN_OK, payload: res.data})
            }
        })
        .catch((err) => {
            dispatch({type: LOGIN_REJECTED, payload: err.response})
        })

};

export const logout = () => async (dispatch) => {
    try {
        AsyncStorage.removeItem(user_key)
            .then(() => dispatch({type: USER_LOGOUT}))
            .catch((e) => (
                console.error("can not add to cart" + e)
            ))
    } catch (error) {
        console.error("error on saving" + error)
    }

};

export const register = (email, password) => (dispatch) => {
    dispatch({type: USER_LOAD});

    let requestObj = {
        email: email,
        password: password
    };

    return axios.post([WP_ENDPOINT, USER_PATH, "register"].join("/"), requestObj)
        .then((res) => {
            if (res.data.user.error) {
                dispatch({type: LOGIN_REJECTED, payload: err.response})
            } else {
                dispatch({type: LOGIN_OK, payload: res.data})
            }
        })
        .catch((err) => {
            dispatch({type: LOGIN_REJECTED, payload: err.response})
        })

};


export const getUserOrders = (userId) => (dispatch) => {
    dispatch({type: FETCH_ORDERS_LOAD});

    return axios.get([WP_ENDPOINT, USER_PATH, "orders", userId].join("/"))
        .then((res) => {
            dispatch({type: FETCH_ORDERS_OK, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_ORDERS_REJECTED, payload: err.response})
        })

};

export const getUserOrderItems = (orderId) => (dispatch) => {
    dispatch({type: FETCH_ORDER_ITEMS_LOAD});

    return axios.get([WP_ENDPOINT, USER_PATH, "order", "items", orderId].join("/"))
        .then((res) => {
            dispatch({type: FETCH_ORDER_ITEMS_OK, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_ORDER_ITEMS_REJECTED, payload: err.response})
        })

};


export const setUser = async (user) => {
    try {
        await AsyncStorage.setItem(user_key, JSON.stringify(user))
            .catch((e) => (
                console.error("can not add to cart" + e)
            ))

    } catch (error) {
        console.error("error on saving" + error)
    }
};


export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem(user_key);
        return JSON.parse(user);
    } catch (error) {
        console.error("error geting user")
    }
};


export const addLocalOrders = async (addOrder) => {
    try {

        let orders = await getUserLocalOrders();
        orders.push(addOrder);

        await AsyncStorage.setItem(local_orders_key, JSON.stringify(orders))
            .catch((e) => (
                console.error("can not add to cart" + e)
            ))

    } catch (error) {
        console.error("error on saving local orders" + error)
    }
};


export const removeLocalOrders = () => {
    try {
        AsyncStorage.removeItem(local_orders_key)
            .catch((e) => (
                console.error("can not add to cart" + e)
            ))
    } catch (error) {
        console.error("error on removeing local orders" + error)
    }

};

export const getUserLocalOrders = async () => {
    try {
        let orders = await AsyncStorage.getItem(local_orders_key);
        let ordersJson = JSON.parse(orders);
        if (!ordersJson) {
            ordersJson = [];
        }
        return ordersJson;
    } catch (error) {
        console.error("error getting local orders")
    }
};


