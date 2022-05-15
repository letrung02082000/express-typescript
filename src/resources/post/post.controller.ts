import { Request, Response, NextFunction, Router } from 'express';
import Controller from '@/utils/interfaces/controller.inteface';
import validate from '@/resources/post/post.validation';
import validationMiddleware from '@/middleware/validation.middleware';
import PostService from '@/resources/post/post.service';
import HttpException from '@/utils/exceptions/http.exception';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private postService = new PostService();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const data = await this.postService.create(title, body);
            res.status(201).json({
                data,
            });
        } catch (error) {
            console.log(error);
            next(new HttpException(400, 'cannot create post'));
        }
    };
}

export default PostController;
