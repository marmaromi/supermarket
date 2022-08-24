import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-cart-customer",
    templateUrl: "./cart-customer.component.html",
    styleUrls: ["./cart-customer.component.css"]
})
export class CartCustomerComponent implements OnInit {

  @Input() cartId: string;


  constructor() { }

  ngOnInit(): void {
  }

}
