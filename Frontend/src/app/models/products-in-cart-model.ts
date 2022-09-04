import { ProductModel } from './product-model';

export class ProductsInCartModel {
    public _id: string;
    public productId: string;
    public amount: number;
    public totalProductPrice: number;
    public cartId: string;
    public product: ProductModel;
}
