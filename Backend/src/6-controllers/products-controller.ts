import express, { NextFunction, Request, Response } from "express";
import { ProductModel } from "../4-models/product-model";
import productsLogic from "../5-logic/products-logic";

const router = express.Router();

router.get("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const product = await productsLogic.getOneProduct(_id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    } 
});

router.post("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await productsLogic.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const product = new ProductModel(request.body);
        product._id = _id;
        const updatedProduct = await productsLogic.updateProduct(product);
        response.status(201).json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;