/* eslint-disable @ngrx/prefer-selector-in-select */
/* eslint-disable @ngrx/no-typed-global-store */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';
import { NotifyService } from 'src/app/services/notify.service';
import { getAllProductsInCart, removeProductFromCart } from 'src/app/state/productsInCart/productsInCart.actions';

@Component({
    selector: 'app-cart-customer',
    templateUrl: './cart-customer.component.html',
    styleUrls: ['./cart-customer.component.css']
})
export class CartCustomerComponent implements OnInit, OnDestroy {

    private sub = new Subscription();
    public productsInCart$: Observable<any> = this.store.select(state => state.productsInCart);
    public productsInCart: ProductsInCartModel[] = [];
    @Input() cartId: string;
    public cartForm: FormGroup;
    public totalCartPrice: number;
    public url = this.router.url;

    constructor(
        private notify: NotifyService,
        private store: Store<{ productsInCart: ProductsInCartModel[] }>,
        private router: Router,
    ) { }

    async ngOnInit(): Promise<void> {
        try {
            this.store.dispatch(getAllProductsInCart({ cartId: this.cartId }));
            const productsInCartSub = this.productsInCart$.subscribe(products => {
                this.productsInCart = products.productsInCart;
                this.totalCartPrice = this.productsInCart.reduce((acc, curr) => acc + curr.product.productPrice * curr.amount, 0);
            });
            this.sub.add(productsInCartSub);

        } catch (err: any) {
            this.notify.error(err);
        }
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    pay = () => {
        this.router.navigateByUrl('/order');
    };

    emptyCart = () => {
        for (const product of this.productsInCart) {
            this.store.dispatch(removeProductFromCart({ id: product._id }));
        }
    };

}
