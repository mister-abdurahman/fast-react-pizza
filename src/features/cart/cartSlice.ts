import {createSlice} from '@reduxjs/toolkit';
import { storeType } from '../../store';

export interface cartType {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

interface cartStateType{
    cart: cartType[]
}

const initialState:cartStateType = {
    cart: [] 
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state:cartStateType, action){
            // payload = newItem
            state.cart.push(action.payload);
        },
        deleteItem(state, action){
            state.cart = state.cart.filter(item=> item.pizzaId !== action.payload)
        },
        IncreaseItemQuantity(state, action){
            const Item = state.cart.find(item=> item.pizzaId === action.payload)
            Item?.quantity && Item.quantity++
            Item!.totalPrice = Item!.quantity * Item!.unitPrice
        },
        DecreaseItemQuantity(state, action){
            const Item = state.cart.find(item=> item.pizzaId === action.payload)
            Item?.quantity && Item.quantity--
            Item!.totalPrice = Item!.quantity * Item!.unitPrice

            if(Item?.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
            
        },
        clearCart(state){
            state.cart = [];
        }
    }
})

export const {addItem, deleteItem, IncreaseItemQuantity, DecreaseItemQuantity, clearCart} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQuantity = (state:storeType)=> state.cart.cart.reduce((acc, item)=> acc + item.quantity ,0)
export const getTotalCartPrice = (state:storeType)=> state.cart.cart.reduce((acc, item)=> acc + item.totalPrice ,0)

export const getCart = (state:storeType)=> state.cart.cart
export function getCurrentCartQuantity(id:number){
   return (state:storeType) => state.cart.cart.find(item => item.pizzaId === id)?.quantity
}
