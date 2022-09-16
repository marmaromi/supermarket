/* eslint-disable @ngrx/prefer-selector-in-select */
/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/product-model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { getAllProducts, updateProduct } from 'src/app/state/products/products.actions';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-cart-admin',
    templateUrl: './cart-admin.component.html',
    styleUrls: ['./cart-admin.component.css']
})
export class CartAdminComponent implements OnInit {

    public products$: Observable<any> = this.store.select(state => state.products);
    public product: ProductModel;
    public productImage: string;
    public productForm: FormGroup;
    public products: ProductModel[];
    public categories: string[] = [];
    public types: string[] = ['יחידה', 'קילוגרם'];


    constructor(private fb: FormBuilder,
        private notify: NotifyService,
        private productsService: ProductsService,
        private store: Store<{ products: ProductModel[] }>

    ) { }

    async ngOnInit(): Promise<void> {

        this.products = await this.productsService.getProducts();
        this.store.dispatch(getAllProducts());
        this.products$.subscribe(products => {
            this.products = products.products;
            for (const product of this.products) {
                if (this.categories.indexOf(product.category.name) === -1) {
                    this.categories.push(product.category.name);
                }
            }
        });


        this.productsService.productToEdit$.subscribe(async productToEdit => {
            if (!productToEdit) {
                this.product = this.products[0];
            }
            else {
                this.product = productToEdit;
            }
            if (this.product) {
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
                    ]]
                });
                this.productImage = environment.productsImagesUrl + '/' + this.product.imageName;

            }
        });
    }

    async updateProduct() {
        try {
            const formValue = this.productForm.value;
            const updatedProduct = new ProductModel();
            updatedProduct._id = this.product._id;
            updatedProduct.productName = formValue.productName;
            updatedProduct.productPrice = formValue.price;
            updatedProduct.category = formValue.category;
            updatedProduct.priceParameter = formValue.type;
            updatedProduct.imageName = this.product.imageName;
            if (formValue.image) {
                updatedProduct.image = formValue.image;
            }
            this.store.dispatch(updateProduct({ product: updatedProduct }));
            this.notify.success('המוצר עודכן בהצלחה');
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    uploadImage(event: any) {
        const file = event.target.files[0];
        this.productForm.value.image = file;     
    }

    addProduct() {
    }

    resetForm() {
        this.productForm.reset({
            productName: this.product.productName,
            price: this.product.productPrice,
            category: this.product.category,
            type: this.product.priceParameter,
            image: this.product.image
        });
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
