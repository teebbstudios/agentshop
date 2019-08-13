'use strict';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers'
import {
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
)

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, middleware)(createStore);

const initialState = {

}

export default createStoreWithMiddleware(rootReducer, initialState);
