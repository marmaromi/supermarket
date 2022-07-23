import mongoose from "mongoose";
import { CartModel } from "./cart-model";
import { UserModel } from "./user-model";


export interface IOrderModel extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    cartId: mongoose.Schema.Types.ObjectId;
    amount: number;
    finalPrice: number;
    deliveryCity: string;
    deliveryStreet: string;
    deliveryDate: string;
    orderDate: string;
    fourLastDigits: number;
}

export const OrderSchema = new mongoose.Schema<IOrderModel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Missing user _id"]
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Missing cart _id"],
        unique: true
    },
    finalPrice: {
        type: Number,
        required: [true, "Missing order final price"],
        min: [0, "Price can't be negative"]
    },
    deliveryCity: {
        type: String,
        required: [true, "Missing city"],
        minlength: [2, "City must be at least 2 characters long"],
        maxlength: [50, "City must be 50 characters or less"],
        trim: true,
    },
    deliveryStreet: {
        type: String,
        required: [true, "Missing street"],
        minlength: [2, "Street must be at least 2 characters long"],
        maxlength: [50, "Street must be 50 characters or less"],
        trim: true,
    },
    deliveryDate: {
        type: String,
        required: [true, "Missing delivery date"],
        trim: true
    },
    orderDate: {
        type: String,
        required: [true, "Missing order date"],
        trim: true
    },
    fourLastDigits: {
        type: Number,
        required: [true, "Missing payment details"],
        minlength: [4, "Last 4 digits of payment card are required"],
        maxlength: [4, "Last 4 digits of payment card are required"],
        trim: true
    }

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

OrderSchema.virtual("user", {
    ref: UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

OrderSchema.virtual("cart", {
    ref: CartModel,
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

export const OrderModel = mongoose.model<IOrderModel>(
    "OrderModel",
    OrderSchema,
    "orders"
);