import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';

import { persistReducer } from 'redux-persist';

// the actual localStorage object
import storage from 'redux-persist/lib/storage';

// alternatively
// import sessionStorage from 'redux-persist/lib/storage';


// json object that represents the possible configs for redux-persist
const persistConfig = {
    key: 'root', // at what point in our reducer store, do we want to store everything
    storage,      
    whitelist: ['cart'] // array containing the string names of any of the reducer you want to store
}

// set this as root reducer
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer
});

export default persistReducer(persistConfig, rootReducer);
