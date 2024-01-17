import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ArticleOrder = {
    picture: string;
    name: string;
    quantity: number;
    unitPrice: number;
}

type Article = {
    name: string;
}

export interface OrderState {
    cart: Array<ArticleOrder>;
    totalAmount: number;
}

const initialState: OrderState = {
    cart: [],
    totalAmount: 0,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addArticle: (state, action: PayloadAction<ArticleOrder>) => {
            const articleIndex = state.cart.findIndex((element) => element.name === action.payload.name);
            if (articleIndex === -1) {
                state.cart.push(action.payload);
            } else {
                state.cart[articleIndex].quantity += action.payload.quantity;
            }
            state.totalAmount = state.cart.reduce((acc, curr) => acc += curr.quantity * curr.unitPrice, 0);
        },
        removeOneArticle: (state, action: PayloadAction<ArticleOrder>) => {
           const articleIndex = state.cart.findIndex((element) => element.name === action.payload.name);
           state.cart[articleIndex].quantity -= 1;
           if (state.cart[articleIndex].quantity === 0) {
                state.cart.splice(articleIndex, 1);
           }
           state.totalAmount = state.cart.reduce((acc, curr) => acc += curr.quantity * curr.unitPrice, 0);
        },
        increaseQuantity: (state, action: PayloadAction<Article>) => {
            const articleIndex = state.cart.findIndex((element) => element.name === action.payload.name);
            state.cart[articleIndex].quantity += 1;
            state.totalAmount = state.cart.reduce((acc, curr) => acc += curr.quantity * curr.unitPrice, 0);
        },
        
        removeWholeArticle: (state, action: PayloadAction<Article>) => {
            const articleIndex = state.cart.findIndex((element) => element.name === action.payload.name);
            state.cart.splice(articleIndex, 1);
            state.totalAmount = state.cart.reduce((acc, curr) => acc += curr.quantity * curr.unitPrice, 0);
        },
        
        resetOrder: () => {
            return initialState;
        }
    },
})

export const { addArticle, removeOneArticle, resetOrder, increaseQuantity, removeWholeArticle } = orderSlice.actions;

export default orderSlice.reducer;