import callAPI from '@/config/api';
import React, { createContext, useContext, useReducer } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

// export const CartProvider = (props) => {}

const initialState = {
  cart: [],
  buff: false,
  get: true,
  totalPrice: 0,
  checkoutProduct: [],
  store: {},
  recommendation: [],
  isLoading: false,
  amount: [],
};

export const useCartContext = () => {
  const [state, dispatch] = useContext(CartContext);

  if (!state || !dispatch) {
    throw new Error('useCartContext must be used within a Provider');
  }

  return { state, dispatch };
};

const Reducer = (state, action) => {
  switch (action.type) {
    case 'GET_CARTS':
      return {
        ...state,
        cart: action.payload.carts,
        recommendation: action.payload.recommendation_by_sub_category,
      };
    case 'SUM_PRICE':
      return {
        ...state,
        totalPrice: parseInt(state.totalPrice) + parseInt(action.payload),
      };
    case 'SUB_PRICE':
      return {
        ...state,
        totalPrice: parseInt(state.totalPrice) - parseInt(action.payload),
      };
    case 'RESET_PRICE':
      return {
        ...state,
        totalPrice: 0,
      };
    case 'ADD_TRANSACTION':
      console.log(action.payload);
      return {
        ...state,
        checkoutProduct: action.payload.items,
        store: action.payload.store,
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_AMOUNT':
      return {
        ...state,
        amount: action.payload,
      };
    case 'RESET_STATE':
      return {
        cart: [],
        buff: false,
        get: true,
        totalPrice: 0,
        checkoutProduct: [],
        store: {},
        recommendation: [],
        isLoading: false,
        amount: [],
      };
    default:
      console.log('Awokwokwkwok');
  }
};

export default function CartProvider(props) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return <CartContext.Provider value={[state, dispatch]} {...props} />;
}
