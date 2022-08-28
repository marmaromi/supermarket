import { Component, Input, OnInit } from "@angular/core";
import { ProductsInCartModel } from "src/app/models/products-in-cart-model";

@Component({
    selector: "app-cart-item",
    templateUrl: "./cart-item.component.html",
    styleUrls: ["./cart-item.component.css"]
})
export class CartItemComponent implements OnInit {

    @Input() cartProduct: ProductsInCartModel;


    constructor() { }

    ngOnInit(): void {
    }

}
