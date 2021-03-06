import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.inteface';
import helmet from 'helmet';
import errorMiddleware from '@/middleware/error.middleware';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initDatabaseConnection();
        this.initErrorHandling();
        this.initMiddleware();
        this.initControllers(controllers);
    }

    private initErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    private initMiddleware(): void {
        // this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        // this.express.use(compression());
    }

    private initControllers(controller: Controller[]): void {
        controller.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initDatabaseConnection(): void {
        const { DB_URL } = process.env;

        mongoose.connect(`${DB_URL}`, () => {
            console.log('Connected to database!');
        });
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

export default App;
