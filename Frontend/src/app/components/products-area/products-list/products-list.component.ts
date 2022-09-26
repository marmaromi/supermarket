/* eslint-disable @ngrx/no-typed-global-store */
/* eslint-disable @ngrx/prefer-selector-in-select */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/product-model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { getAllProducts, getProductsByCategory } from 'src/app/state/products/products.actions';


@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {

    private sub = new Subscription();
    public products$: Observable<any> = this.store.select(state => state.products);
    public products: ProductModel[] = [];
    public productsToShow: ProductModel[];
    public categories: string[] = [];
    public category: string = 'כל המוצרים';
    public userRole: string;
    public totalProductsCount: number = null;


    constructor(
        private authService: AuthService,
        private notify: NotifyService,
        private store: Store<{ products: ProductModel[] }>
    ) { }

    async ngOnInit() {

        try {
            this.store.dispatch(getAllProducts());
            this.userRole = (this.authService.getUserDetails()).role;
            if (this.userRole !== 'admin') {
                const cartId = sessionStorage.getItem('cartId');
            }
            this.getProducts();


        } catch (error: any) {
            this.notify.error(error);
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    async getProducts() {
        const productsSub = this.products$.subscribe(products => {

            this.products = products.products;
            if (this.totalProductsCount === null) {
                this.totalProductsCount = this.products.length;
            }
            for (const product of this.products) {
                if (this.categories.indexOf(product.category.name) === -1) {
                    this.categories.push(product.category.name);
                }
            }
            this.productsToShow = [...this.products];

            // decide what category to show
            const uniqueCategories = [...new Set(this.products.map(p => p.category.name))];

            if (uniqueCategories.length === this.categories.length && this.totalProductsCount === this.products.length) {
                this.category = 'כל המוצרים';
            }

            if (uniqueCategories.length !== this.categories.length && uniqueCategories.length > 1 && this.totalProductsCount !== this.products.length) {
                this.category = 'כללי';
            }

            if (uniqueCategories.length === 1 && this.totalProductsCount !== this.products.length && this.category !== 'כללי') {
                this.category = uniqueCategories[0];
            }
        });

        this.sub.add(productsSub);

    }

    async showCategory(category: string) {
        if (category === 'all') {
            this.store.dispatch(getAllProducts());
        }
        else {
            this.store.dispatch(getProductsByCategory({ categoryName: category }));
            this.category = category;
        }
    }

}
