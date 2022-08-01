import { ValidationError } from "../4-models/error-models";
import { IOrderModel, OrderModel } from "../4-models/order-model";
import cartsLogic from "./carts-logic";

async function getAllOrders(): Promise<IOrderModel[]> {
    return OrderModel.find().populate([{ path: "user", select: "firstName lastName email city street -_id" }, { path: "cart", select: "creationDate cartOpen -_id" }]).exec();
}

async function getOrdersByUserId(userId: string): Promise<IOrderModel[]> {
    return OrderModel.find({ userId: userId }, null)
        .populate([{ path: "user", select: "firstName lastName email city street -_id" }, { path: "cart", select: "creationDate cartOpen -_id" }]).exec();
}

async function addOrder(order: IOrderModel): Promise<IOrderModel> {
    const errors = order.validateSync();
    if (errors) {
        throw new ValidationError(errors.message);
    }
    console.log(order.cartId.toString());

    cartsLogic.closeCart(order.cartId.toString());
    return order.save();
}

async function getOrdersCount(): Promise<number> {
    return OrderModel.count().exec()
}

export default {
    getAllOrders,
    getOrdersByUserId,
    addOrder,
    getOrdersCount
}