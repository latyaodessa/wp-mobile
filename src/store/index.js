import {applyMiddleware} from 'redux'
import {createStore} from "redux/es/redux";
import rootReducer from '../reducers'
import loggerMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
export default createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));
