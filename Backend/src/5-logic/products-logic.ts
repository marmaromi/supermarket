import { ResourceNotFoundError, ValidationError } from "../4-models/error-models";
import { IProductModel, ProductModel } from "../4-models/product-model";


async function getAllProducts(): Promise<IProductModel[]> {
    return ProductModel.find().populate("category", "-_id").exec();
}

async function getOneProduct(_id: string): Promise<IProductModel> {
    const product = await ProductModel.findById(_id).populate("category", "-_id").exec();
    
    if(!product){
        throw new ResourceNotFoundError(_id);
    }
    return product;
}

async function addProduct(product: IProductModel): Promise<IProductModel>{
    const errors = product.validateSync();
    if (errors) {
        throw new ValidationError(errors.message);
    }
    return product.save();
}

async function updateProduct(product: IProductModel): Promise<IProductModel>{
    const errors = product.validateSync();
    if (errors) {
        throw new ValidationError(errors.message);
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, {returnOriginal: false});
    if(!updatedProduct){
        throw new ResourceNotFoundError(product._id);
    }
    return updatedProduct;
}

async function getProductsCount(): Promise<number> {
    return ProductModel.count().exec()
}



export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    getProductsCount

};

