import express, { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs"
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLogIn from "../3-middleware/verify-log-in";
import { ProductModel } from "../4-models/product-model";
import productsLogic from "../5-logic/products-logic";
import { RouteNotFoundError } from "../4-models/error-models";
import { UploadedFile } from "express-fileupload";

const router = express.Router();

router.get("/products", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/products/:_id", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const product = await productsLogic.getOneProduct(_id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    } 
});

router.post("/products", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await productsLogic.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/products/:_id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {        
        const _id = request.params._id;
        request.body.image = request.files?.image;
        // console.log(request.body.image);
        
        const product = new ProductModel(request.body);
        product._id = _id;
        // product.image = request.files?.image;
        // console.log(product.image);
        const updatedProduct = await productsLogic.updateProduct(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/products/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const imageName = request.params.imageName;        
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        
        if (!fs.existsSync(absolutePath)) {
            throw new RouteNotFoundError(request.method, request.originalUrl);
        }
        
        response.sendFile(absolutePath);
    }

    catch (error) {
        next(error);
    }
});

router.get("/products-count", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const productsCount = await productsLogic.getProductsCount();
        response.json(productsCount);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;