import { ValidationError } from "../4-models/error-models";
import { IOrderModel } from "../4-models/order-model";


async function addOrder(order: IOrderModel): Promise<IOrderModel> {

    const errors = order.validateSync();
    if (errors) {
        throw new ValidationError(errors.message);
    }
    return order.save();
}

export default {
    addOrder
}