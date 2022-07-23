import mongoose from "mongoose";
import { UploadedFile } from "express-fileupload";
import { CategoryModel } from "./category-model";

export interface IProductModel extends mongoose.Document {
    productName: string;
    categoryId: mongoose.Schema.Types.ObjectId;
    productPrice: number;
    imageName: string;
    image: UploadedFile;
}

export const ProductSchema = new mongoose.Schema<IProductModel>({
    productName: {
        type: String,
        required: [true, "Missing product name"],
        minlength: [2, "Product name too short"],
        maxlength: [100, "Product name too long"],
        trim: true,
        unique: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId
    },
    productPrice: {
        type: Number,
        required: [true, "Missing product price"],
        min: [0, "Product price can't be negative"],
        max: [10000, "Product price can't exceed 10,000₪"]
    },
    imageName: {
        type: String
    },
    image: {
        type: Buffer, // **************************** probably won't work ***********************************
        // required: [true, "Missing product image"]
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

ProductSchema.virtual("category", {
    ref: CategoryModel,
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

export const ProductModel = mongoose.model<IProductModel>(
    "ProductModel",
    ProductSchema,
    "products"
);