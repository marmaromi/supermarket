import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product-model';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { addProductToCart, removeProductFromCart } from 'src/app/state/productsInCart/productsInCart.actions';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    public addProductToCartForm: FormGroup;
    @Input() productsInCart: ProductsInCartModel[];
    @Input() product: ProductModel;
    public productImage: string;
    public cartId: string;
    public initialAmount: number = 0;


    constructor(private fb: FormBuilder, private notify: NotifyService, private cartService: CartService, private store: Store) { }

    async ngOnInit(): Promise<void> {

        if (this.product.imageName) {
            this.productImage = environment.productsImagesUrl + '/' + this.product.imageName;
        }

        this.initialAmount = this.productsInCart.find(p => p.productId === this.product._id)?.amount || 0;
        this.addProductToCartForm = this.fb.group({
            productAmount: this.initialAmount
        });
        this.cartId = sessionStorage.getItem('cartId');

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
                this.store.dispatch(addProductToCart({ product: productInCart }));
            }
            if (formValue.productAmount === 0) {
                // this.cartService.deleteProductFromCart(this.product._id);
                const productInCartId = this.productsInCart.find(p => p.productId === this.product._id)._id;
                this.store.dispatch(removeProductFromCart({ id: productInCartId }));

            }

        } catch (err: any) {
            this.notify.error(err);

        }

    }
}
