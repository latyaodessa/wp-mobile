import {combineReducers} from 'redux';
import {cart, products, singleProduct, categories} from "./product";
import {images} from "./attachments";
import {checkoutFields, shippingMethods, submit} from "./checkout";
import {loginData, orderItems, userOrders} from "./user";
import {links} from "./core";

export default combineReducers({
    products, singleProduct, cart, categories,
    images,
    checkoutFields, shippingMethods, submit,
    loginData, userOrders, orderItems,
    links
});
