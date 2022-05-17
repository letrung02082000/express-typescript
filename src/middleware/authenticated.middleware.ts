import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '@/utils/exceptions/http.exception';
import { verifyToken } from '@/utils/token';
import Token from '@/utils/interfaces/token.interface';
import UserModel from '@/resources/user/user.model';

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Unauthorised',
        });
    }

    const accessToken = bearer.split(' ')[1].trim();

    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(
            accessToken
        );

        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'unauthorised'));
        }

        const user = await UserModel.findById(payload.id)
            .select('-password')
            .exec();

        if (!user) {
            return next(new HttpException(401, 'unauthorised'));
        }

        req.user = user;

        return next();
    } catch (error: any) {
        return next(new HttpException(401, 'unauthorised'));
    }
}

export default authenticatedMiddleware;
