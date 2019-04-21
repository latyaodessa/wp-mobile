import {AsyncStorage} from "react-native"
import axios from "axios";
import {WP_ENDPOINT} from "../../app.cofig";
import {
    FETCH_ORDER_ITEMS_OK,
    FETCH_ORDER_ITEMS_REJECTED,
    FETCH_ORDERS_OK,
    FETCH_ORDERS_REJECTED,
    LOGIN_OK,
    LOGIN_REJECTED,
    USER_LOAD,
    USER_LOGOUT,
    FETCH_ORDERS_LOAD,
    FETCH_ORDER_ITEMS_LOAD
} from "../constants/user";

const user_key = 'user';
const orders_key = 'orders';

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

// export const setOrders = async (orders) => {
//     try {
//         await AsyncStorage.setItem(orders_key, JSON.stringify(orders))
//             .catch((e) => (
//                 console.error("can not add to cart" + e)
//             ))
//
//     } catch (error) {
//         console.error("error on saving" + error)
//     }
// };


export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem(user_key);
        return JSON.parse(user);
    } catch (error) {
        console.error("error geting user")
    }
};


// export const getUserOrders = async () => {
//     try {
//         const orders = await AsyncStorage.getItem(orders_key);
//         return JSON.parse(orders);
//     } catch (error) {
//         console.error("error geting user")
//     }
// };
