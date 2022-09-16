import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product-model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {


    private _productToEditSource = new Subject<ProductModel>();
    public productToEdit$ = this._productToEditSource.asObservable();

    constructor(private http: HttpClient, store: Store) { }

    public async getProductsCount(): Promise<number> {
        const productsCount = await firstValueFrom(this.http.get<number>(environment.productsUrl + '-count'));
        return productsCount;
    }

    public async getProducts(): Promise<ProductModel[]> {
        try {
            const products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl));
            return products;
        } catch (error) {
            throw error;
        }
    }

    public async getProductsByCategory(categoryName: string): Promise<ProductModel[]> {
        const products = await this.getProducts();
        const filteredProducts = products.filter(p => p.category.name === categoryName);
        return filteredProducts;
    }

    public async getProductsBySearch(productName: string): Promise<ProductModel[]> {
        const products = await this.getProducts();
        const filteredProducts = products.filter(p => p.productName.includes(productName));        
        return filteredProducts;
    }

    public async getOneProduct(id: string): Promise<ProductModel> {
        const product = await firstValueFrom(this.http.get<ProductModel>(environment.productsUrl + '/' + id));
        this._productToEditSource.next(product);
        return product;
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {
        const addedProduct = await firstValueFrom(this.http.post<ProductModel>(environment.productsUrl, product));
        return addedProduct;
    }

    public async updateProduct(product: ProductModel): Promise<ProductModel> {
        const formData = new FormData();
        formData.append('_id', product._id);
        formData.append('productName', product.productName);
        formData.append('productPrice', product.productPrice.toString());
        formData.append('category', product.category._id);
        formData.append('priceParameter', product.priceParameter);
        formData.append('imageName', product.imageName);
        if (product?.image) {
            formData.append('image', product.image);
        }
        else {
            formData.append('imageName', product.imageName);
        }
        // console.log(formData.get('image'));

        const updatedProduct = await firstValueFrom(this.http.put<ProductModel>(environment.productsUrl + '/' + product._id, formData));

        return updatedProduct;
    }
}
