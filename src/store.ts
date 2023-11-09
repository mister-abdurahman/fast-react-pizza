import {configureStore} from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import cartReducer, { cartType } from './features/cart/cartSlice';

export interface storeType {
    user: {username: string, status: string,
        position: {longitude: number, latitude: number},
        address: string,
        error?: string},
    cart: {cart: cartType[]}
}

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
})

export default store;