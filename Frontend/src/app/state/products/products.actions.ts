import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product-model';

// get all products

export const getAllProducts = createAction(
    '[Products] Get All Products',
);


export const getAllProductsSuccess = createAction(
    '[Products] Get All Products Success',
    props<{ products: ProductModel[] }>()
);

export const getAllProductsFailure = createAction(
    '[Products] Get All Products Failure',
    props<{ error: string }>()
);

// get products by search

export const getProductsBySearch = createAction(
    '[Products] Get Products By Search',
    props<{ productName: string }>()
);

export const getProductsBySearchSuccess = createAction(
    '[Products] Get Products By Search Success',
    props<{ products: ProductModel[] }>()
);

export const getProductsBySearchFailure = createAction(
    '[Products] Get Products By Search Failure',
    props<{ error: string }>()
);

// get products by category

export const getProductsByCategory = createAction(
    '[Products] Get Products By Category',
    props<{ categoryName: string }>()
);

export const getProductsByCategorySuccess = createAction(
    '[Products] Get Products By Category Success',
    props<{ products: ProductModel[] }>()
);

export const getProductsByCategoryFailure = createAction(
    '[Products] Get Products By Category Failure',
    props<{ error: string }>()
);

// add and update product

export const updateProduct = createAction(
    '[Products] update Product',
    props<{ product: ProductModel }>()
);

export const addProduct = createAction(
    '[Products] add Product',
    props<{ product: ProductModel }>()
);

// export const getOneProduct = createAction(
//     '[Product] Get One Product',
//     props<{ productId: string }>()
// );