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
import { getAllProducts, getProductsByCategory } from 'src/app/state/products/products.actions';
import { getAllProductsInCart } from 'src/app/state/productsInCart/productsInCart.actions';


@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
    public products$: Observable<any> = this.store.select(state => state.products);
    public productsInCart$: Observable<any> = this.store.select(state => state.productsInCart);
    public products: ProductModel[] = [];
    public productsToShow: ProductModel[];
    public productsInCart: ProductsInCartModel[] = [];
    public categories: string[] = [];
    public category: string = 'כל המוצרים';
    public userRole: string;


    constructor(
        private authService: AuthService,
        private notify: NotifyService,
        private cartService: CartService,
        private store: Store<{ products: ProductModel[], productsInCart: ProductsInCartModel[] }>
    ) { }

    async ngOnInit() {
        
        try {
            this.store.dispatch(getAllProducts());
            this.userRole = (this.authService.getUserDetails()).role;
            if (this.userRole !== 'admin') {
                const cartId = sessionStorage.getItem('cartId');
                this.store.dispatch(getAllProductsInCart({ cartId: cartId }));
                this.productsInCart = await this.cartService.getProductsInCart();
            }

            this.products$.subscribe(products => {
                
                this.products = products.products;
                for (const product of this.products) {
                    if (this.categories.indexOf(product.category.name) === -1) {
                        this.categories.push(product.category.name);
                    }
                }
                this.productsToShow = [...this.products];
            });

        } catch (error: any) {
            this.notify.error(error);

        }

    }

    showCategory(category: string) {
        if (category === 'all') {
            this.store.dispatch(getAllProducts());
            this.productsToShow = [...this.products];
        }
        else {
            this.store.dispatch(getProductsByCategory({ categoryName: category }));
            console.log(this.products);
            
            this.category = category;
            this.productsToShow.length = 0;
            this.productsToShow = this.products.filter(p => p.category.name === category);
        }
    }

}
