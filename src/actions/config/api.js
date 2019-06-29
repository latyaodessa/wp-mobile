import {AsyncStorage} from "react-native"
import axios from "axios";
import {CONFIG_PATH} from "../../../app.cofig";
import {FETCH_API_LOAD, FETCH_API_OK, FETCH_API_REJECTED} from "../../constants/settings";

const api_key = 'api';


export const fetchApi = () => (dispatch) => {
    dispatch({type: FETCH_API_LOAD});
    return axios.get(CONFIG_PATH)
        .then(res => {
            dispatch({type: FETCH_API_OK, payload: res.data});
            res.data;
        }).catch((err) => {
            dispatch({type: FETCH_API_REJECTED, payload: err.response})
        });

};

export const getApi = async () => {
    try {
        const api = await AsyncStorage.getItem(api_key);
        const apiJson = JSON.parse(api);


        if (!apiJson) {

            // await axios.get('/user?ID=12345');
            // console.log(response);

            // axios.get([BACKEND, "settings"].join("/"))
            //     .then( (res) => {
            //         // await setApi(res);
            //         console.log(res);
            //         return res;
            //     })
            //     .catch((err) => {
            //
            //     })
        } else {
            return apiJson;
        }
    } catch (error) {
        console.error("error getting local orders")
    }
};


export const setApi = async (api) => {
    try {
        await AsyncStorage.setItem(api_key, JSON.stringify(api))
            .catch((e) => (
                console.error("can not save api" + e)
            ))

    } catch (error) {
        console.error("error on saving" + error)
    }
};


export const removeApi = async () => {
    try {
        AsyncStorage.removeItem(api_key)
            .catch((e) => (
                console.error("error remove" + e)
            ))
    } catch (error) {
        console.error("error remove" + error)
    }

};



