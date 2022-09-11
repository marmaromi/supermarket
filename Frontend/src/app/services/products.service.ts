import { HttpClient } from '@angular/common/http';
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

    public async getOneProduct(id: string): Promise<ProductModel> {
        const product = await firstValueFrom(this.http.get<ProductModel>(environment.productsUrl + '/' +id));
        this._productToEditSource.next(product);
        return product;
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {
        const addedProduct = await firstValueFrom(this.http.post<ProductModel>(environment.productsUrl, product));
        return addedProduct;
    }

    public async updateProduct(product: ProductModel): Promise<ProductModel> {
        const updatedProduct = await firstValueFrom(this.http.put<ProductModel>(environment.productsUrl + product._id, product));
        return updatedProduct;
    }
}
