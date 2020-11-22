import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

import { persistReducer } from 'redux-persist';

// the actual localStorage object
import storage from 'redux-persist/lib/storage';

// alternatively
// import sessionStorage from 'redux-persist/lib/storage';


// json object that represents the possible configs for redux-persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] // string names of any of the reducer you want to store
}

// set this as root reducer
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);
