import { CategoryModel } from "./category-model";

export class ProductModel {
    _id: string;
    productName: string;
    categoryId: string;
    productPrice: number;
    imageName: string;
    image: File;
    priceParameter: string;
    category: CategoryModel;
}
