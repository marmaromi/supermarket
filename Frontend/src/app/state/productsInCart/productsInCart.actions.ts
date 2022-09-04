import { createAction, props } from '@ngrx/store';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';

export const getAllProductsInCart = createAction(
    '[ProductsInCart] Get All Products In Cart',
    props<{ cartId: string }>()
);

export const getAllProductsInCartSuccess = createAction(
    '[ProductsInCart] Get All Products In Cart Success',
    props<{ productsInCart: ProductsInCartModel[] }>());

export const getAllProductsInCartFailure = createAction(
    '[ProductsInCart] Get All Products In Cart Failure',
    props<{ error: string }>()
);

export const addProductToCart = createAction(
    '[ProductsInCart] Add Product To Cart',
    props<{ product: ProductsInCartModel }>()
);

export const updateProductInCart = createAction(
    '[ProductsInCart] update Product In Cart',
    props<{ product: ProductsInCartModel }>()
);

export const removeProductFromCart = createAction(
    '[ProductsInCart] Remove Product From Cart',
    props<{ id: string }>()
); 