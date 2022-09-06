import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';
import { NotifyService } from 'src/app/services/notify.service';
import { addProductToCart, removeProductFromCart, updateProductInCart } from 'src/app/state/productsInCart/productsInCart.actions';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

    public cartForm: FormGroup;
    @Input() cartProductInput: ProductsInCartModel;
    public cartProduct: ProductsInCartModel;
    public productImage: string;
    public cartId: string;
    public initialAmount: number;
    public totalProductPrice: number;


    constructor(private fb: FormBuilder, private store: Store, private notify: NotifyService) { }



    ngOnInit(): void {
        this.cartProduct = {...this.cartProductInput}; // can't use this.cartProductInput because it's a reference to the original object
        if (this.cartProduct.product.imageName) {
            this.productImage = environment.productsImagesUrl + '/' + this.cartProduct.product.imageName;
        }

        this.initialAmount = this.cartProduct.amount;
        this.totalProductPrice = this.initialAmount*this.cartProduct.product.productPrice;

        this.cartForm = this.fb.group({
            productAmount: this.cartProduct.amount
        });
        this.cartId = sessionStorage.getItem('cartId');
    }

    get productAmount() {
        return this.cartForm.get('productAmount');
    }

    updateAmountCounter(num: number) {

        if (!(num === -1 && this.cartProduct.amount === 1)) {
            this.cartProduct.amount = this.cartProduct.amount + num;
        }
    }

    async updateProduct(): Promise<void> {
        if (this.cartProduct.amount !== this.initialAmount && this.cartProduct.amount > 0) {
            this.store.dispatch(updateProductInCart({ product: this.cartProduct }));
        }
    }

    onKeydown(event: KeyboardEvent) {
        if (event.key === '-' || event.key === '+' || event.key === 'e' || event.key === '0') {
            event.preventDefault();
        }
    }

    deleteProduct() {
        // this.cartService.deleteProductFromCart(this.cartProduct._id);
        this.store.dispatch(removeProductFromCart({ id: this.cartProduct._id }));
    }


}
