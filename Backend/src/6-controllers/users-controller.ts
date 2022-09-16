import express, { NextFunction, Request, Response } from "express";
import { CredentialsModel } from "../4-models/credentials-model";
import { ValidationError } from "../4-models/error-models";
import { UserModel } from "../4-models/user-model";
import usersLogic from "../5-logic/users-logic";

const router = express.Router();

router.post("/users/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body)
        // check if email and ID are unique
        const email = await CredentialsModel.findOne({ email: user.email }).exec();
        const id = await UserModel.findOne({ citizenId: user.citizenId }).exec();
        if (email || id) {
            throw new ValidationError("משתמש עם כתובת אימייל או תעודת זהות זו כבר קיים במערכת");
        }
        
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