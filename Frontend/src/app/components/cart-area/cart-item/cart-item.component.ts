import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';
import { NotifyService } from 'src/app/services/notify.service';
import { SearchService } from 'src/app/services/search.service';
import { getAllProductsInCart, removeProductFromCart, updateProductInCart } from 'src/app/state/productsInCart/productsInCart.actions';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit, AfterViewInit, OnDestroy {

    private sub = new Subscription();
    public cartForm: FormGroup;
    @Input() cartProductInput: ProductsInCartModel;
    public cartProduct: ProductsInCartModel;
    public productImage: string;
    public cartId: string;
    public initialAmount: number;
    public totalProductPrice: number;
    public url = this.router.url;
    // public searchValue: string = '';
    @ViewChild('productNameHtml') productNameHtml: ElementRef;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private notify: NotifyService,
        private router: Router,
        private searchService: SearchService
    ) { }

    ngOnInit(): void {
        this.cartProduct = { ...this.cartProductInput }; // can't use this.cartProductInput because it's a reference to the original object
        if (this.cartProduct.product.imageName) {
            this.productImage = environment.productsImagesUrl + '/' + this.cartProduct.product.imageName;
        }

        this.initialAmount = this.cartProduct.amount;
        this.totalProductPrice = this.initialAmount * this.cartProduct.product.productPrice;

        this.cartForm = this.fb.group({
            productAmount: this.cartProduct.amount
        });
        this.cartId = sessionStorage.getItem('cartId');
    }

    ngAfterViewInit() {
        const searchSub = this.searchService.searchValueSource.subscribe(searchValue => {
            if (this.router.url === '/order') {
                if (this.cartProduct.product.productName.includes(searchValue) && searchValue !== '') {
                    this.productNameHtml.nativeElement.setAttribute('class', 'highlight');
                }
                else {
                    this.productNameHtml.nativeElement.setAttribute('class', '');
                }
            }
        });
        this.sub.add(searchSub);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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
        this.store.dispatch(removeProductFromCart({ id: this.cartProduct._id }));
        setTimeout(() => { // wait for the store to update
            this.store.dispatch(getAllProductsInCart({ cartId: this.cartId }));
        }, 10);
    }


}
