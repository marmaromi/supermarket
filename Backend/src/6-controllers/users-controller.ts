import express, { NextFunction, Request, Response } from "express";
import { CredentialsModel } from "../4-models/credentials-model";
import { UserModel } from "../4-models/user-model";
import usersLogic from "../5-logic/users-logic";

const router = express.Router();

router.post("/users/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body)
        const newUser = await usersLogic.register(user);
        response.json(newUser);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/users/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body)
        const user = await usersLogic.login(credentials);
        response.json(user);
    }
    catch (err: any) {
        next(err);
    }
});




export default router;