import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.log(error);
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    res.status(status).send({ status, message });
}

export default errorMiddleware;
