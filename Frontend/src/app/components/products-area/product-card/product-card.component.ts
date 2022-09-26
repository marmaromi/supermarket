/* eslint-disable @ngrx/prefer-selector-in-select */
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/product-model';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';
import { NotifyService } from 'src/app/services/notify.service';
import { removeProductFromCart, updateProductInCart } from 'src/app/state/productsInCart/productsInCart.actions';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {

    private sub = new Subscription();
    public addProductToCartForm: FormGroup;
    public productsInCart: ProductsInCartModel[];
    public productsInCart$: Observable<any> = this.store.select(state => (state as any).productsInCart);
    @Input() product: ProductModel;
    public productImage: string;
    public cartId: string;
    public initialAmount: number = 0;


    constructor(private fb: FormBuilder, private notify: NotifyService, private store: Store) { }

    async ngOnInit(): Promise<void> {
        const productsInCartSub = this.productsInCart$.subscribe((data) => {
            this.productsInCart = data.productsInCart;
            this.initialAmount = this.productsInCart.find(p => p.productId === this.product._id)?.amount || 0;
        });
        this.sub.add(productsInCartSub);



        if (this.product.imageName) {
            this.productImage = environment.productsImagesUrl + '/' + this.product.imageName;
        }


        this.addProductToCartForm = this.fb.group({
            productAmount: this.initialAmount
        });
        this.cartId = sessionStorage.getItem('cartId');

    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    get productAmount() {
        return this.addProductToCartForm.get('productAmount');
    }


    public async addToCart() {
        try {
            const formValue = this.addProductToCartForm.value;
            if (formValue.productAmount > 0) {
                const productInCart: ProductsInCartModel = {
                    productId: this.product._id,
                    amount: formValue.productAmount,
                    cartId: this.cartId,
                    _id: null,
                    totalProductPrice: this.product.productPrice * formValue.productAmount,
                    product: this.product
                };
                this.store.dispatch(updateProductInCart({ product: productInCart }));
            }
            if (formValue.productAmount === 0 && this.initialAmount > 0) {
                const productInCartId = this.productsInCart.find(p => p.productId === this.product._id)._id;
                this.store.dispatch(removeProductFromCart({ id: productInCartId }));

            }
        } catch (err: any) {
            this.notify.error(err);

        }

    }
}
