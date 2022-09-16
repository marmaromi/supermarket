/* eslint-disable @ngrx/no-typed-global-store */
/* eslint-disable @ngrx/prefer-selector-in-select */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { AppState } from '../app.state';
import { addProduct, getAllProducts, getAllProductsFailure, getAllProductsSuccess, getProductsByCategory, getProductsByCategoryFailure, getProductsByCategorySuccess, getProductsBySearch, getProductsBySearchFailure, getProductsBySearchSuccess, updateProduct } from './products.actions';

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

    loadProductsBySearch$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getProductsBySearch),
            switchMap((action) =>
                from(this.productsService.getProductsBySearch(action.productName)).pipe(
                    map(products => getProductsBySearchSuccess({ products: products })),
                    catchError((error) => of(getProductsBySearchFailure({ error: error })))
                ))
        );
    });

    loadProductsByCategory$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getProductsByCategory),
            switchMap((action) =>
                from(this.productsService.getProductsByCategory(action.categoryName)).pipe(
                    map(products => getProductsByCategorySuccess({ products: products })),
                    catchError((error) => of(getProductsByCategoryFailure({ error: error })))
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