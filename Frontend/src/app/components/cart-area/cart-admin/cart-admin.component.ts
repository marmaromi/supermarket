/* eslint-disable @ngrx/prefer-selector-in-select */
/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CategoryModel } from 'src/app/models/category-model';
import { ProductModel } from 'src/app/models/product-model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { getAllProducts, updateProduct, addProduct } from 'src/app/state/products/products.actions';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-cart-admin',
    templateUrl: './cart-admin.component.html',
    styleUrls: ['./cart-admin.component.css']
})
export class CartAdminComponent implements OnInit, OnDestroy {

    private sub = new Subscription();
    public products$: Observable<any> = this.store.select(state => state.products);
    public product: ProductModel;
    public productImage: string = '../../../assets/images/generic-product.png';
    public productForm: FormGroup;
    public products: ProductModel[];
    public categories: string[] = [];
    public types: string[] = ['יחידה', 'קילוגרם'];
    public addOrUpdateProduct: string = 'add';


    constructor(private fb: FormBuilder,
        private notify: NotifyService,
        private productsService: ProductsService,
        private store: Store<{ products: ProductModel[] }>

    ) { }

    async ngOnInit(): Promise<void> {
        this.products = await this.productsService.getProducts();
        this.store.dispatch(getAllProducts());
        const productsSub = this.products$.subscribe(products => {
            this.products = products.products;
            for (const product of this.products) {
                if (this.categories.indexOf(product.category.name) === -1) {
                    this.categories.push(product.category.name);
                }
            }
        });
        this.sub.add(productsSub);


        this.productForm = this.fb.group({
            productName: ['', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30)
            ]],
            price: [0, [
                Validators.required,
                Validators.pattern(/^[1-9]\d*(\.\d+)?$/)
            ]],
            category: ['', [
                Validators.required,
            ]],
            type: ['', [
                Validators.required,
            ]],
            image: ['', [
            ]]
        });

        const productsToEditSub = this.productsService.productToEdit$.subscribe(async productToEdit => {
            this.addOrUpdateProduct = 'update';
            this.product = productToEdit;

            if (this.product) {                
                this.productForm = this.fb.group({
                    productName: [this.product.productName, [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(30)
                    ]],
                    price: [this.product.productPrice, [
                        Validators.required,
                        Validators.pattern(/^[1-9]\d*(\.\d+)?$/)
                    ]],
                    category: [this.product.category.name, [
                        Validators.required,
                    ]],
                    type: [this.product.priceParameter, [
                        Validators.required,
                    ]],
                    image: [this.product.image, [
                    ]]
                });
                this.productImage = environment.productsImagesUrl + '/' + this.product.imageName;

            }
        });
        this.sub.add(productsToEditSub);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    uploadImage(event: any) {
        const file = event.target.files[0];
        this.productForm.value.image = file;
    }

    async updateProduct() {
        try {
            const formValue = this.productForm.value;            
            const updatedProduct = new ProductModel();
            const cat = new CategoryModel();
            cat.name = formValue.category;
            updatedProduct._id = this.product._id;
            updatedProduct.productName = formValue.productName;
            updatedProduct.productPrice = formValue.price;
            updatedProduct.category = cat;
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

    addProduct() {
        try {

            const formValue = this.productForm.value;
            const newProduct = new ProductModel();
            const cat = new CategoryModel();
            cat.name = formValue.category;
            newProduct.productName = formValue.productName;
            newProduct.productPrice = formValue.price;
            newProduct.category = cat;
            newProduct.priceParameter = formValue.type;
            if (formValue.image) {
                newProduct.image = formValue.image;
            }
            
            this.store.dispatch(addProduct({ product: newProduct }));
            this.notify.success('המוצר התווסף בהצלחה');
        }
        catch (err) {
            this.notify.error(err);
        }

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

    changeAddOrUpdateProduct() {
        this.addOrUpdateProduct = 'add';
        this.product = null;
        this.productImage = '../../../assets/images/generic-product.png';
        this.productForm = this.fb.group({
            productName: ['', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30)
            ]],
            price: [0, [
                Validators.required,
                Validators.pattern(/^[1-9]\d*(\.\d+)?$/)
            ]],
            category: ['', [
                Validators.required,
            ]],
            type: ['', [
                Validators.required,
            ]],
            image: ['', [
            ]]
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
