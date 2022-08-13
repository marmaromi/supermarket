import { NextFunction, Request, Response } from "express";
import cyberToken from "../2-utils/cyber-token";

async function verifyLogIn(request: Request, response: Response, next: NextFunction) {

    try {
        await cyberToken.verifyToken(request);        
        next();
    } catch (error) {
        next(error);
    }

}

export default verifyLogIn;