import * as productsInCartActions from './productsInCart.actions';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';
import { createReducer, on } from '@ngrx/store';

export interface ProductsInCartState {
    productsInCart: ProductsInCartModel[];
    error: string;
    status: 'pending' | 'loading' | 'success' | 'error';
}

export const initialState: ProductsInCartState = {
    productsInCart: [],
    error: null,
    status: 'pending'
};

export const productsInCartReducer = createReducer(
    initialState,
    on(productsInCartActions.getAllProductsInCart, (state): ProductsInCartState => ({ ...state, status: 'loading' })),

    on(productsInCartActions.getAllProductsInCartSuccess, (state, { productsInCart }): ProductsInCartState => ({
        ...state,
        productsInCart: productsInCart,
        error: null,
        status: 'success'
    })),

    on(productsInCartActions.getAllProductsInCartFailure, (state, { error }): ProductsInCartState => ({
        ...state,
        error: error,
        status: 'error'
    })),

    on(productsInCartActions.addProductToCart, (state, action): ProductsInCartState => ({
        ...state,
        productsInCart: [...state.productsInCart, action.product]
    })),

    on(productsInCartActions.updateProductInCart, (state, { product }) => ({
        ...state,
        productsInCart: state.productsInCart.map(p => p._id === product._id ? product : p)
    })),

    on(productsInCartActions.removeProductFromCart, (state, { id }) => ({
        ...state,
        productsInCart: state.productsInCart.filter(product => product._id !== id)
    }))

);