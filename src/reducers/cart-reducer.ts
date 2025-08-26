import { db, type Guitar } from "../data/db";

export type CartActions = 
    { type: 'ADD_TO_CART', payload: { item: Guitar } } |
    { type: 'REMOVE_FROM_CART', payload: { id: Guitar['id'] } } | 
    { type: 'DECREASE_QUANTITY', payload: { id: Guitar['id'] } } | 
    { type: 'INCREASE_QUANTITY', payload: { id: Guitar['id'] } } | 
    { type: 'CLEAR_CART' }


export type CartState = {
    data: Guitar[];    
    cart: Guitar[];
}

export const initialState: CartState = {
    data: db,
    cart: []
}

export const cartReducer = (state: CartState = initialState, action: CartActions) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, action.payload.item] }
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) }
        case 'DECREASE_QUANTITY':
    }
}