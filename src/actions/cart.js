import {AsyncStorage} from "react-native"
import {CART_UPDATE_EVENT} from "../constants/product";

const items_key = 'items';


export const addToCart = (item) => async (dispatch) => {
    try {

        let cartItems = await getCartItems();


        let cartObj = {
            id: item.id,
            thumbnail: item.single_image[0],
            name: item.name,
            count: 1,
            price: item.price,
            regular_price: item.regular_price,
            total: item.price,
            currency: item.currency
        };

        if (cartItems.items[[item.id]]) {
            cartItems.items[[item.id]].count = ++cartItems.items[[item.id]].count;
            cartItems.items[[item.id]].total = parseFloat(cartItems.items[[item.id]].total) + parseFloat(cartItems.items[[item.id]].price);
        } else {
            cartItems.items[[item.id]] = cartObj;
        }

        cartItems.count = ++cartItems.count;
        cartItems.total = parseFloat(cartItems.total) + parseFloat(cartItems.items[[item.id]].price);

        await AsyncStorage.setItem(items_key, JSON.stringify(cartItems))
            .then(() => (
                dispatch({type: CART_UPDATE_EVENT, payload: cartItems})
            ))
            .catch((e) => (
                console.error("can not add to cart" + e)
            ))

    } catch (error) {
        console.error("error on saving" + error)
    }
};

export const deleteItem = (itemId) => async (dispatch) => {
    try {

        let cartItems = await getCartItems();
        let itemToDelete = cartItems.items[itemId];

        if (itemToDelete != null) {
            cartItems.count -= itemToDelete.count;
            cartItems.total -= itemToDelete.total;
            delete cartItems.items[itemId];
        }

        await AsyncStorage.setItem(items_key, JSON.stringify(cartItems))
            .then(() => (
                dispatch({type: CART_UPDATE_EVENT, payload: cartItems})
            ))
            .catch((e) => (
                console.error("can not update cart" + e)
            ))


    } catch (error) {
        console.error("error on deleting")
    }
};


export const plusOne = (itemId) => async (dispatch) => {
    try {

        let cartItems = await getCartItems();
        let itemToUpdate = cartItems.items[itemId];

        if (itemToUpdate != null) {
            ++cartItems.count;
            ++cartItems.items[itemId].count;
            cartItems.items[itemId].total = parseFloat(cartItems.items[itemId].total) + parseFloat(cartItems.items[itemId].price);
            cartItems.total = parseFloat(cartItems.total) + parseFloat(cartItems.items[[itemId]].price);

        }

        await AsyncStorage.setItem(items_key, JSON.stringify(cartItems))
            .then(() => (
                dispatch({type: CART_UPDATE_EVENT, payload: cartItems})
            ))
            .catch((e) => (
                console.error("can not update cart" + e)
            ))


    } catch (error) {
        console.error("error on plus One" + error)
    }
};

export const minusOne = (itemId) => async (dispatch) => {
    try {

        let cartItems = await getCartItems();
        let itemToUpdate = cartItems.items[itemId];

        if (itemToUpdate != null) {
            if (cartItems.items[itemId].count > 1) {
                --cartItems.items[itemId].count;
                --cartItems.count;
                cartItems.items[itemId].total = parseFloat(cartItems.items[itemId].total) - parseFloat(cartItems.items[itemId].price);
                cartItems.total = parseFloat(cartItems.total) - parseFloat(cartItems.items[[itemId]].price);

            } else {
                cartItems.count -= itemToUpdate.count;
                cartItems.total -= itemToUpdate.total;
                delete cartItems.items[itemId];
            }


            await AsyncStorage.setItem(items_key, JSON.stringify(cartItems))
                .then(() => (
                    dispatch({type: CART_UPDATE_EVENT, payload: cartItems})
                ))
                .catch((e) => (
                    console.error("can not update cart" + e)
                ))
        }


    } catch (error) {
        console.error("error on plus One" + error)
    }
};

export const getCartItems = async () => {
    try {

        const existingItems = await AsyncStorage.getItem(items_key);

        let existingItemsJson = JSON.parse(existingItems);
        if (!existingItemsJson) {
            existingItemsJson = {items: {}, count: 0, total: 0};
        }

        return existingItemsJson;

    } catch (error) {
        console.error("error on saving")
    }
};

export const emptyCart = () => async (dispatch) => {
    try {
        AsyncStorage.removeItem(items_key)
            .then(() => dispatch({type: CART_UPDATE_EVENT, payload: {items: {}, count: 0, total: 0}}))
            .catch((e) => (
                console.error("can not empty cart" + e)
            ))

    } catch (error) {
        console.error("can not empty cart")
    }
};


