import { ValidationError } from "../4-models/error-models";
import { IOrderModel, OrderModel } from "../4-models/order-model";

async function getAllOrders(): Promise<IOrderModel[]> {
    return OrderModel.find().populate(["user", "cart"]).exec();
}

async function addOrder(order: IOrderModel): Promise<IOrderModel> {
    const errors = order.validateSync();
    if (errors) {
        throw new ValidationError(errors.message);
    }
    return order.save();
}

async function getOrdersCount(): Promise<number> {
    return OrderModel.count().exec()
}

export default {
    getAllOrders,
    addOrder,
    getOrdersCount
}