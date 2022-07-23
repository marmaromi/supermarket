import mongoose from "mongoose";
import { CartModel, ICartModel } from "../4-models/cart-model";
import { ResourceNotFoundError, ValidationError } from "../4-models/error-models";
import { UserModel } from "../4-models/user-model";


async function createCart(userIdString: string): Promise<ICartModel> {
    const userId = await (await UserModel.findById(userIdString).exec())._id;
    if (!userId) {
        throw new ResourceNotFoundError(userId);
    }

    const now = new Date().toLocaleString();
    const cart = new CartModel({ userId: userId, creationDate: now });

    const errors = cart.validateSync();
    if (errors) {
        throw new ValidationError(errors.message);
    }
    return cart.save();
}

export default {
    createCart,
    
}