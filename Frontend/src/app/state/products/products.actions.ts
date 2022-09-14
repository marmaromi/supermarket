import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product-model';

export const getAllProducts = createAction(
    '[Products] Get All Products',
);

export const getOneProduct = createAction(
    '[Product] Get One Product',
    props<{ productId: string }>()
);

export const getAllProductsSuccess = createAction(
    '[Products] Get All Products Success',
    props<{ products: ProductModel[] }>()
);

export const getAllProductsFailure = createAction(
    '[Products] Get All Products Failure',
    props<{ error: string }>()
);

export const getProductsBySearch = createAction(
    '[Products] Get Some Products',
    props<{ productName: string }>()
);

export const getProductsByCategory = createAction(
    '[Products] Get Some Products',
    props<{ categoryName: string }>()
);

export const updateProduct = createAction(
    '[Products] update Product',
    props<{ product: ProductModel }>()
);

export const addProduct = createAction(
    '[Products] add Product',
    props<{ product: ProductModel }>()
);