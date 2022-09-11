import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProductsState } from './products.reducer';

export const selectProducts = (state: AppState) => state.products;
export const selectAllProducts = createSelector(
    selectProducts,
    (state: ProductsState) => state.products
);