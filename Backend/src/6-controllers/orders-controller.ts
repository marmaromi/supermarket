import express, { NextFunction, Request, Response } from "express";
import verifyLogIn from "../3-middleware/verify-log-in";
import { ValidationError } from "../4-models/error-models";
import { OrderModel } from "../4-models/order-model";
import { ProductInCartModel } from "../4-models/product-in-cart-model";
import ordersLogic from "../5-logic/orders-logic";

const router = express.Router();

router.get("/orders", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orders = await ordersLogic.getAllOrders();
        response.json(orders);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/orders/:userId", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId;
        const order = await ordersLogic.getOrdersByUserId(userId);
        response.json(order);
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/orders", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const order = new OrderModel(request.body);
        const productsInCart = await ProductInCartModel.findOne({ cartId: order.cartId }).exec();
        if (productsInCart === null) {
            throw new ValidationError("לא ניתן לבצע הזמנה עם עגלה ריקה'");
        }
        
        const addedOrder = await ordersLogic.addOrder(order);
        response.status(201).json(addedOrder);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/orders-count", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orderCount = await ordersLogic.getOrdersCount();
        response.json(orderCount);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;