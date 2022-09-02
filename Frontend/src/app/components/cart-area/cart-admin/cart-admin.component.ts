import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/models/product-model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-cart-admin',
    templateUrl: './cart-admin.component.html',
    styleUrls: ['./cart-admin.component.css']
})
export class CartAdminComponent implements OnInit {

    public product: ProductModel;
    public productImage: string;
    public productForm: FormGroup;
    public products: ProductModel[];
    public categories: string[] = [];
    public types: string[] = ['יחידה','קילוגרם'];


    constructor(private fb: FormBuilder, private notify: NotifyService, private productsService: ProductsService) { }

    async ngOnInit(): Promise<void> {
        this.products = await this.productsService.getProducts();
        this.product = this.products[0];
        for (const product of this.products) {
            if (this.categories.indexOf(product.category.name) === -1) {
                this.categories.push(product.category.name);
            }        
        }


        this.productForm = this.fb.group({
            productName: [this.product.productName, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30)
            ]],
            price: [this.product.productPrice, [
                Validators.required,
                Validators.pattern(/^\d{1,9}$/)
            ]],
            category: [this.product.category, [
                Validators.required,
            ]],
            type: [this.product.priceParameter, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30)
            ]],
            image: [this.product.image, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30)
            ]]
        });
        this.productForm.valueChanges.subscribe(console.log);
        // this.productImage = this.product.image;


    }

    updateProduct() {
    }


    get productName() {
        return this.productForm.get('productName');
    }

    get price() {
        return this.productForm.get('price');
    }

    get category() {
        return this.productForm.get('category');
    }

    get type() {
        return this.productForm.get('type');
    }

    get image() {
        return this.productForm.get('image');
    }


}
