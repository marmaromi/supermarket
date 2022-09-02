import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductModel } from 'src/app/models/product-model';

@Component({
    selector: 'app-cart-admin',
    templateUrl: './cart-admin.component.html',
    styleUrls: ['./cart-admin.component.css']
})
export class CartAdminComponent implements OnInit {

    @Input() product: ProductModel;
    public productImage: string;
    public productForm: FormGroup;
    public categories: string[] = [];


    constructor() { }

    ngOnInit(): void {
    }

    updateProduct() {
    }

}
