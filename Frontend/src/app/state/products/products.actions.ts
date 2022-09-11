import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product-model';

export const getAllProducts = createAction(
    '[Products] Get All Products',
);

export const getAllProductsSuccess = createAction(
    '[Products] Get All Products Success',
    props<{ products: ProductModel[] }>());

export const getAllProductsFailure = createAction(
    '[Products] Get All Products Failure',
    props<{ error: string }>()
);

export const updateProduct = createAction(
    '[Products] update Product',
    props<{ product: ProductModel }>()
);

export const addProduct = createAction(
    '[Products] add Product',
    props<{ product: ProductModel }>()
);