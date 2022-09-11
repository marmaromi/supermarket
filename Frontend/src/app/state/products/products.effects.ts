/* eslint-disable @ngrx/no-typed-global-store */
/* eslint-disable @ngrx/prefer-selector-in-select */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { AppState } from '../app.state';
import { addProduct, getAllProducts, getAllProductsFailure, getAllProductsSuccess, updateProduct } from './products.actions';

@Injectable()
export class ProductsEffects {

    constructor(
        private actions$: Actions,
        private productsService: ProductsService,
        private store: Store<AppState>
    ) { }


    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getAllProducts),
            switchMap(() =>
                from(this.productsService.getProducts()).pipe(
                    map(products => getAllProductsSuccess({ products: products })),
                    catchError((error) => of(getAllProductsFailure({ error: error })))
                ))
        );
    });


    addProduct$ = createEffect(() =>
    { return this.actions$.pipe(
        ofType(addProduct),
        concatLatestFrom(() => this.store.select(state => state.products)),
        switchMap(([action, products]) => from(this.productsService.addProduct(action.product)))
    ); },
    { dispatch: false }
    );


    updateProduct$ = createEffect(() =>
    { return this.actions$.pipe(
        ofType(updateProduct),
        concatLatestFrom(() => this.store.select(state => state.products)),
        switchMap(([action, products]) => from(this.productsService.updateProduct(action.product)))
    ); },
    { dispatch: false });
}