import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { AppState } from '../app.state';
import { addProductToCart, getAllProductsInCart, getAllProductsInCartFailure, getAllProductsInCartSuccess, removeProductFromCart, updateProductInCart } from './productsInCart.actions';

@Injectable()
export class ProductsInCartEffects {

    constructor(
        private actions$: Actions,
        private cartService: CartService,
        private store: Store<AppState>
    ) { }


    loadProductsInCarts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getAllProductsInCart),
            switchMap(() =>
                from(this.cartService.getProductsInCart()).pipe(
                    map(productsInCarts => getAllProductsInCartSuccess({ productsInCart: productsInCarts })),
                    catchError((error) => of(getAllProductsInCartFailure({ error: error })))
                ))
        );
    });


    addProductToCart$ = createEffect(() =>
    { return this.actions$.pipe(
        ofType(addProductToCart),
        concatLatestFrom(() => this.store.select(state => state.productsInCart)),
        switchMap(([action, productsInCart]) => from(this.cartService.addToCart(action.product.cartId, action.product.productId, action.product.amount)))
    ); },
    { dispatch: false }
    );


    updateProductInCart$ = createEffect(() =>
    { return this.actions$.pipe(
        ofType(updateProductInCart),
        concatLatestFrom(() => this.store.select(state => state.productsInCart)),
        switchMap(([action, productsInCart]) => from(this.cartService.addToCart(action.product.cartId, action.product.productId, action.product.amount)))
    ); },
    { dispatch: false });


    removeProductFromCart$ = createEffect(() =>
    { return this.actions$.pipe(
        ofType(removeProductFromCart),
        concatLatestFrom(() => this.store.select(state => state.productsInCart)),
        switchMap(([action]) => from(this.cartService.deleteProductFromCart(action.id)))
    ); },
    { dispatch: false });

}