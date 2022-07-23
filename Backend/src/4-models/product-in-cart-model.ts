import mongoose from "mongoose";
import { CartModel } from "./cart-model";
import { ProductModel } from "./product-model";


export interface IProductInCartModel extends mongoose.Document {
    productId: string;
    amount: number;
    totalProductPrice: number;
    cartId: mongoose.Schema.Types.ObjectId;
}

export const ProductInCartSchema = new mongoose.Schema<IProductInCartModel>({
    productId: {
        type: String,
        required: [true, "Missing product _id in cart"],
    },
    amount: {
        type: Number,
        required: [true, "Missing product amount in cart"],
        min: [0, "Amount can't be negative"]
    },
    totalProductPrice: {
        type: Number,
        required: [true, "Missing product total price in cart"],
        min: [0, "Price can't be negative"]
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Missing cart _id"],
    }

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

ProductInCartSchema.virtual("product", {
    ref: ProductModel,
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

ProductInCartSchema.virtual("cart", {
    ref: CartModel,
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

export const ProductInCartModel = mongoose.model<IProductInCartModel>(
    "ProductInCartModel",
    ProductInCartSchema,
    "products-in-cart"
);