import {combineReducers} from 'redux';
import {products, singleProduct, cart} from "./product";
import {images} from "./attachments";

export default combineReducers({
    products, singleProduct, cart,
    images
});
