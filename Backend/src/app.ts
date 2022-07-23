import express, { NextFunction, Request, Response } from "express";
import expressRateLimit from "express-rate-limit";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import config from "./2-utils/config";
import catchAll from "./3-middleware/catch-all";
import { RouteNotFoundError } from "./4-models/error-models";
import dal from "./2-utils/dal";
import productsController from "./6-controllers/products-controller";
import usersController from "./6-controllers/users-controller";
import cartController from "./6-controllers/carts-controller";
import orderController from "./6-controllers/orders-controller";
import sanitize from "./3-middleware/sanitize";
import path from "path";

const expressServer = express();

expressServer.use(cors());

expressServer.use("/api/", expressRateLimit({
    windowMs: 100,
    max: 100,
    message: "User exceeded maximum request limit"
}));

expressServer.use(express.json());
expressServer.use(expressFileUpload());
expressServer.use(sanitize);


expressServer.use("/api", productsController);
expressServer.use("/api", usersController);
expressServer.use("/api", cartController);
expressServer.use("/api", orderController);

expressServer.use(express.static(path.join(__dirname, "./7-frontend")));
expressServer.use("*", (req: Request, res: Response, next: NextFunction) => {
    if (config.isProduction) {
        res.sendFile(path.join(__dirname, "./7-frontend/index.html"));
    }
    else {
        const error = new RouteNotFoundError(req.method, req.originalUrl);
        next(error);
    }
});

expressServer.use(catchAll);

expressServer.listen(config.port, () => {
    dal.connect()
    console.log(`Listening on http://localhost:${config.port}`)
});