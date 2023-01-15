import { log } from "../../config/logger";
import { Request, Response, NextFunction, Errback } from 'express';
// eslint-disable-next-line no-unused-vars
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let { statusCode, message } = err;

    if (process.env.ENVIRONMENT !== "development") {
        log.error(err);
    }

    const response = {
        code: statusCode,
        message,
    };

    res.status(statusCode).send(response);
};

export default errorHandler;