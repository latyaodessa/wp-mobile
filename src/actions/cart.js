import {AsyncStorage} from "react-native"
import {CART_UPDATE_EVENT} from "../constants/product";

const key = 'items';


export const addToCart = (item) => async (dispatch) => {
    try {

        const existingItems = await AsyncStorage.getItem(key);

        let existingItemsJson = JSON.parse(existingItems);
        if (!existingItemsJson) {
            existingItemsJson = [];
        }

        existingItemsJson.push(item);



        await AsyncStorage.setItem(key, JSON.stringify(existingItemsJson))
            .then(() => (
                dispatch({type: CART_UPDATE_EVENT, payload: existingItemsJson})
            ))
            .catch(() => (
                console.error("can not add to cart")
            ))

    } catch (error) {
        console.error("error on saving")
    }
};

export const getCartItems = async () => {
    try {

        const existingItems = await AsyncStorage.getItem(key);

        let existingItemsJson = JSON.parse(existingItems);
        if (!existingItemsJson) {
            existingItemsJson = []
        }

        return existingItemsJson;

    } catch (error) {
        console.error("error on saving")
    }
};

