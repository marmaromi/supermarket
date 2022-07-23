import express, { NextFunction, Request, Response } from "express";
import { ProductModel } from "../4-models/product-model";
import cartLogic from "../5-logic/carts-logic";

const router = express.Router();

router.post("/carts/:userId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId;
        const cart = await cartLogic.createCart(userId);
        response.status(201).json(cart);
    }
    catch (err: any) {
        next(err);
    }
});



export default router;