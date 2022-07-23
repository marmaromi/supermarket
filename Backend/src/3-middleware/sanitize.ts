import { Request, Response, NextFunction } from "express";
import stripTags from "striptags";

function sanitize(req: Request, res: Response, next: NextFunction): void {

    for (const prop in req.body) {
        if (typeof req.body[prop] === "string") {
            req.body[prop] = stripTags(req.body[prop]);
        }
    }

    next();

}
export default sanitize;