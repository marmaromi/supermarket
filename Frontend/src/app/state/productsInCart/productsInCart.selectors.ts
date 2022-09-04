import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProductsInCartState } from './productsInCart.reducer';

export const selectProductsInCart = (state: AppState) => state.productsInCart;
export const selectAllProductsInCart = createSelector(
    selectProductsInCart,
    (state: ProductsInCartState) => state.productsInCart
);