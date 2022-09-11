/* eslint-disable @ngrx/no-typed-global-store */
/* eslint-disable @ngrx/prefer-selector-in-select */
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/product-model';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { getAllProducts } from 'src/app/state/products/products.actions';


@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
    public products$: Observable<any> = this.store.select(state => state.products);
    public products: ProductModel[] = [];
    public productsToShow: ProductModel[];
    public productsInCart: ProductsInCartModel[];
    public categories: string[] = [];
    public category: string = 'כל המוצרים';
    public userRole: string;


    constructor(
        private productsService: ProductsService,
        private authService: AuthService,
        private notify: NotifyService,
        private cartService: CartService,
        private store: Store<{ products: ProductModel[] }>
    ) { }

    async ngOnInit() {

        try {
            this.store.dispatch(getAllProducts());
            console.log(this.products$);

            this.products$.subscribe(products => {
                console.log(products);

                this.products = products.products;
                for (const product of this.products) {
                    if (this.categories.indexOf(product.category.name) === -1) {
                        this.categories.push(product.category.name);
                    }
                }
                this.productsToShow = [...this.products];
            });

            this.userRole = (this.authService.getUserDetails()).role;
            if (this.userRole !== 'admin') {
                this.productsInCart = await this.cartService.getProductsInCart();
            }

            // this.products = await this.productsService.getProducts();
            // for (const product of this.products) {
            //     if (this.categories.indexOf(product.category.name) === -1) {
            //         this.categories.push(product.category.name);
            //     }
            // }

            // this.productsToShow = [...this.products];

        } catch (error: any) {
            this.notify.error(error);

        }

    }

    showCategory(category: string) {
        if (category === 'all') {
            this.productsToShow = [...this.products];
        }
        else {
            this.category = category;
            this.productsToShow.length = 0;
            this.productsToShow = this.products.filter(p => p.category.name === category);
        }
    }

}
