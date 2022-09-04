import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { getAllProductsInCart, getAllProductsInCartFailure, getAllProductsInCartSuccess } from './productsInCart.actions';

@Injectable()
export class ProductsInCartEffects {

    constructor(
        private actions$: Actions,
        private cartService: CartService
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
}