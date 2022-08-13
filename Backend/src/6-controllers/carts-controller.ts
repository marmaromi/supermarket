import express, { NextFunction, Request, Response } from "express";
import verifyLogIn from "../3-middleware/verify-log-in";
import { ProductInCartModel } from "../4-models/product-in-cart-model";
import cartLogic from "../5-logic/carts-logic";

const router = express.Router();

router.get("/carts/:userId", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId;
        const cart = await cartLogic.getLatestCartByUser(userId);
        response.json(cart);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/cart/products/:cartId", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = request.params.cartId;
        const cart = await cartLogic.getCartWithItems(cartId);
        response.json(cart);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/carts/:userId", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId;
        console.log(userId);
        
        const cart = await cartLogic.createCart(userId);
        response.status(201).json(cart);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/carts/:_id", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await cartLogic.deleteCart(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/cart/products/:cartId/:productId", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId: string = request.params.cartId;
        const productId: string = request.params.productId;
        const addedProduct = await cartLogic.addProduct(productId, cartId);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/cart/products/:_id", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        const product = new ProductInCartModel(request.body)
        const updatedProduct = await cartLogic.updateProduct(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/cart/products/:_id", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await cartLogic.deleteProduct(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;