import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// allows our browser to cache store depending on configs.
import { persistStore } from 'redux-persist';

import thunk from 'redux-thunk';


const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') { middlewares.push(logger); } 

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default {store, persistor};