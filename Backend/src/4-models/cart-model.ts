import mongoose from "mongoose";

export interface ICartModel extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    creationDate: string;
}

export const CartSchema = new mongoose.Schema<ICartModel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Missing customer _id"],
        unique: true
    },
    creationDate: {
        type: String,
        required: [true, "Missing cart creation date"]
    }

}, {
    versionKey: false
});

export const CartModel = mongoose.model<ICartModel>(
    "CartModel",
    CartSchema,
    "carts"
);