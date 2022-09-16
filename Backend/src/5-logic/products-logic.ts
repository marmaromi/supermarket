import { ResourceNotFoundError, ValidationError } from "../4-models/error-models";
import { IProductModel, ProductModel } from "../4-models/product-model";
import { v4 as uuid } from "uuid";
import fs from "fs";
import config from "../2-utils/config";

async function getAllProducts(): Promise<IProductModel[]> {
    return ProductModel.find().populate("category", "-_id").exec();
}

async function getOneProduct(_id: string): Promise<IProductModel> {
    const product = await ProductModel.findById(_id).populate("category", "-_id").exec();

    if (!product) {
        throw new ResourceNotFoundError(_id);
    }
    return product;
}

async function addProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) {
        throw new ValidationError(errors.message);
    }

    //save image to backend assets
    const dotIndex = product.image.name.lastIndexOf(".");
    const extension = product.image.name.substring(dotIndex);
    product.imageName = uuid() + extension;
    await product.image.mv(config.imagesPath + product.imageName);
    delete product.image;

    return product.save();
}

async function updateProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) {
        throw new ValidationError(errors.message);
    }
    if (product.image) {
        // delete previous image
        const imageToDelete = config.imagesPath + product.imageName;        
        fs.unlink(imageToDelete, (err) => {
            if (err) {
                console.log(`Image to delete not found in path: "${imageToDelete}"`);
            }
            else console.log(`File was deleted in path: "${imageToDelete}"`);
        });
        //save image to backend assets
        const dotIndex = product.image.name.lastIndexOf(".");
        const extension = product.image.name.substring(dotIndex);
        product.imageName = uuid() + extension;
        await product.image.mv(config.imagesPath + product.imageName);
        delete product.image;
    }


    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false });
    if (!updatedProduct) {
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

