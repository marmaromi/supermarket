import mongoose from "mongoose";
import { ProductInCartModel } from "./product-in-cart-model";

export interface ICartModel extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    creationDate: string;
    cartOpen: boolean;
}

export const CartSchema = new mongoose.Schema<ICartModel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Missing customer _id"]
    },
    creationDate: {
        type: String,
        required: [true, "Missing cart creation date"]
    },
    cartOpen: {
        type: Boolean
    }

}, {
    versionKey: false,
    // toJSON: {virtuals: true},
    // id: false
});

// CartSchema.virtual("product-in-cart",{
//     ref: ProductInCartModel,
//     localField: "_id",
//     foreignField: "cartId",
//     justOne: true
// });

export const CartModel = mongoose.model<ICartModel>(
    "CartModel",
    CartSchema,
    "carts"
);