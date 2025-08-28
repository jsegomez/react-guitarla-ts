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

const initialCart = (): Guitar[] => {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error al cargar el carrito desde localStorage:', error);
        return [];
    }
}

export const initialState: CartState = {
    data: db,
    cart: initialCart()
}

export const cartReducer = (state: CartState = initialState, action: CartActions) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            {
                const exists = state.cart.some(item => item.id === action.payload.item.id);
                if(exists){
                    return {
                        ...state,
                        cart: state.cart.map(item =>
                            item.id === action.payload.item.id
                                ? { ...item, quantity: item.quantity! + 1 }
                                : item
                        )
                    }
                }else{
                    return {
                        ...state,
                        cart: [...state.cart, { ...action.payload.item, quantity: 1 }]
                    };
                }
            }
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) }
        case 'DECREASE_QUANTITY':
            {
                const selectedItem = state.cart.find(item => item.id === action.payload.id);
                if(selectedItem?.quantity && selectedItem.quantity > 1){
                    return {
                        ...state,
                        cart: state.cart.map(item =>
                            item.id === action.payload.id
                                ? { ...item, quantity: item.quantity! - 1 }
                                : item
                        )
                    }
                }else{
                    return {
                        ...state,
                        cart: [...state.cart]
                    }
                }

            }
        case 'INCREASE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity! + 1 }
                        : item
                )
            }
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            }

    }
}