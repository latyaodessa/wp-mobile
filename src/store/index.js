import {applyMiddleware} from 'redux'
import {createStore} from "redux/es/redux";
import rootReducer from '../reducers'
import loggerMiddleware from 'redux-logger';

export default createStore(rootReducer, applyMiddleware(loggerMiddleware));
