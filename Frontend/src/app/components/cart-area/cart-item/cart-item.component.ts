import { Component, Input, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProductsInCartModel } from "src/app/models/products-in-cart-model";
import { CartService } from "src/app/services/cart.service";
import { NotifyService } from "src/app/services/notify.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-cart-item",
    templateUrl: "./cart-item.component.html",
    styleUrls: ["./cart-item.component.css"]
})
export class CartItemComponent implements OnInit {

    public cartForm: FormGroup;
    @Input() cartProduct: ProductsInCartModel;
    public productImage: string;
    public cartId: string;
    public initialAmount: number;


    constructor(private fb: FormBuilder, private notify: NotifyService, private cartService: CartService, private renderer2: Renderer2) { }



    ngOnInit(): void {
        if (this.cartProduct.product.imageName) {
            this.productImage = environment.productsImagesUrl + "/" + this.cartProduct.product.imageName;
        }

        this.initialAmount = this.cartProduct.amount;

        this.cartForm = this.fb.group({
            productAmount: this.cartProduct.amount
        });
        this.cartId = sessionStorage.getItem("cartId");
    }

    get productAmount() {
        return this.cartForm.get("productAmount");
    }

    updateAmountCounter(num: number) {
        if (!(num === -1 && this.cartProduct.amount === 1)) {
            this.cartProduct.amount = this.cartProduct.amount + num;
        }
    }

    async updateProduct(): Promise<void> {
        if (this.cartProduct.amount !== this.initialAmount && this.cartProduct.amount > 0) {
            await this.cartService.addToCart(this.cartProduct.cartId, this.cartProduct.productId, this.cartProduct.amount);
            this.initialAmount = this.cartProduct.amount;
            this.cartProduct.totalProductPrice = this.cartProduct.product.productPrice * this.cartProduct.amount;

        }
    }

    onKeydown(event: KeyboardEvent) {
        if (event.key === "-" || event.key === "+" || event.key === "e" || event.key === "0") {
            event.preventDefault();
        }
    }

    deleteProduct() {
        this.cartService.deleteProductFromCart(this.cartProduct._id);
    }


}
