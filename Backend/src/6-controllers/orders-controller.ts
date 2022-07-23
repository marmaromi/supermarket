import express, { NextFunction, Request, Response } from "express";
import { OrderModel } from "../4-models/order-model";
import { ProductInCartModel } from "../4-models/product-in-cart-model";
import cartLogic from "../5-logic/carts-logic";
import ordersLogic from "../5-logic/orders-logic";

const router = express.Router();

router.post("/orders", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const order = new OrderModel(request.body);
        const addedOrder = await ordersLogic.addOrder(order);
        response.status(201).json(addedOrder);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;