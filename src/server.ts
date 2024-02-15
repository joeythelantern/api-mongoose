import http from 'http';
import express from 'express';
import './config/logging';
import 'reflect-metadata';

import { corsHandler } from './middleware/corsHandler';
import { loggingHandler } from './middleware/loggingHandler';
import { routeNotFound } from './middleware/routeNotFound';

import MainController from './controllers/main';
import { defineRoutes } from './modules/routes';
import mongoose from 'mongoose';
import BookController from './controllers/book';
import { declareHandler } from './middleware/declareHandler';

export const application = express();
export let server: ReturnType<typeof http.createServer>;

export const Main = async () => {
    logging.log('----------------------------------------');
    logging.log('Initializing API');
    logging.log('----------------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logging.log('----------------------------------------');
    logging.log('Connect to Mongo');
    logging.log('----------------------------------------');
    try {
        const connection = await mongoose.connect('mongodb+srv://superuser2:roseville@cluster0.wdxayfs.mongodb.net/test', {
            retryWrites: true,
            w: 'majority'
        });
        logging.log('----------------------------------------');
        logging.log('Connected to Mongo: ', connection.version);
        logging.log('----------------------------------------');
    } catch (error) {
        logging.log('----------------------------------------');
        logging.error(error);
        logging.error('Unable to connect to Mongo');
        logging.log('----------------------------------------');
    }

    logging.log('----------------------------------------');
    logging.log('Logging & Configuration');
    logging.log('----------------------------------------');
    application.use(declareHandler);
    application.use(loggingHandler);
    application.use(corsHandler);

    logging.log('----------------------------------------');
    logging.log('Define Controller Routing');
    logging.log('----------------------------------------');
    defineRoutes([BookController, MainController], application);

    logging.log('----------------------------------------');
    logging.log('Define Routing Error');
    logging.log('----------------------------------------');
    application.use(routeNotFound);

    logging.log('----------------------------------------');
    logging.log('Starting Server');
    logging.log('----------------------------------------');
    server = http.createServer(application);
    server.listen(1337, () => {
        logging.log('----------------------------------------');
        logging.log(`Server started on ${JSON.stringify(server.address())}`);
        logging.log('----------------------------------------');
    });
};

export const Shutdown = (callback: any) => server && server.close(callback);

Main();
