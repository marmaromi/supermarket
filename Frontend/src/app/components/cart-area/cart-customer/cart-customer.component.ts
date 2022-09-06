/* eslint-disable @ngrx/prefer-selector-in-select */
/* eslint-disable @ngrx/no-typed-global-store */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';
import { NotifyService } from 'src/app/services/notify.service';
import { getAllProductsInCart } from 'src/app/state/productsInCart/productsInCart.actions';

@Component({
    selector: 'app-cart-customer',
    templateUrl: './cart-customer.component.html',
    styleUrls: ['./cart-customer.component.css']
})
export class CartCustomerComponent implements OnInit {
    public productsInCart$: Observable<any> = this.store.select(state => state.productsInCart);
    public productsInCart: ProductsInCartModel[] = [];
    @Input() cartId: string;
    public cartForm: FormGroup;
    public totalCartPrice: number;



    constructor(private notify: NotifyService, private store: Store<{ productsInCart: ProductsInCartModel[] }>) { }

    async ngOnInit(): Promise<void> {
        try {
            this.store.dispatch(getAllProductsInCart({ cartId: this.cartId }));
            this.productsInCart$.subscribe(products => {
                this.productsInCart = products.productsInCart;
                this.totalCartPrice = this.productsInCart.reduce((acc, curr) => acc + curr.product.productPrice * curr.amount, 0);
            });

        } catch (err: any) {
            this.notify.error(err);
        }


    }

    pay = () => {
        console.log('pay');
    };

}
