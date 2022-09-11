import { ProductsState } from './products/products.reducer';
import { ProductsInCartState } from './productsInCart/productsInCart.reducer';

export interface AppState {
    products: ProductsState;
    productsInCart: ProductsInCartState;
}