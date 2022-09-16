import * as productsActions from './products.actions';
import { ProductModel } from 'src/app/models/product-model';
import { createReducer, on } from '@ngrx/store';

export interface ProductsState {
    products: ProductModel[];
    error: string;
    status: 'pending' | 'loading' | 'success' | 'error';
}

export const initialState: ProductsState = {
    products: [],
    error: null,
    status: 'pending'
};

export const productsReducer = createReducer(
    initialState,

    // get all products
    on(productsActions.getAllProducts, (state): ProductsState => ({ ...state, status: 'loading' })),

    on(productsActions.getAllProductsSuccess, (state, { products }): ProductsState => ({
        ...state,
        products: products,
        error: null,
        status: 'success'
    })),

    on(productsActions.getAllProductsFailure, (state, { error }): ProductsState => ({
        ...state,
        error: error,
        status: 'error'
    })),

    // get products by search
    on(productsActions.getProductsBySearch, (state, action): ProductsState => ({
        ...state,
        products: state.products.filter(product => product.productName.includes(action.productName))
    })),

    on(productsActions.getProductsBySearchSuccess, (state, { products }): ProductsState => ({
        ...state,
        products: products,
        error: null,
        status: 'success'
    })),

    on(productsActions.getProductsBySearchFailure, (state, { error }): ProductsState => ({
        ...state,
        error: error,
        status: 'error'
    })),

    // get products by category
    on(productsActions.getProductsByCategory, (state, action): ProductsState => ({
        ...state,
        products: state.products.filter(product => product.category.name.includes(action.categoryName))
    })),

    on(productsActions.getProductsByCategorySuccess, (state, { products }): ProductsState => ({
        ...state,
        products: products,
        error: null,
        status: 'success'
    })),

    on(productsActions.getProductsByCategoryFailure, (state, { error }): ProductsState => ({
        ...state,
        error: error,
        status: 'error'
    })),

    // add and update product
    on(productsActions.addProduct, (state, action): ProductsState => ({
        ...state,
        products: [...state.products, action.product]
    })),

    on(productsActions.updateProduct, (state, { product }) => ({
        ...state,
        products: state.products.map(p => p._id === product._id ? product : p)
    })),

);