import { NextFunction, Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { MongoGet } from '../decorators/mongoose/get';
import { Book } from '../models/book';
import { MongoGetAll } from '../decorators/mongoose/getAll';
import { MongoDelete } from '../decorators/mongoose/delete';
import { MongoQuery } from '../decorators/mongoose/query';
import { MongoUpdate } from '../decorators/mongoose/update';
import { MongoCreate } from '../decorators/mongoose/create';

@Controller('/books')
class BookController {
    @Route('get', '/get/all')
    @MongoGetAll(Book)
    getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }

    @Route('get', '/get/:id')
    @MongoGet(Book)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }

    @Route('post', '/create')
    @MongoCreate(Book)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }

    @Route('post', '/query')
    @MongoQuery(Book)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoQuery);
    }

    @Route('patch', '/update/:id')
    @MongoUpdate(Book)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoUpdate);
    }

    @Route('delete', '/delete/:id')
    @MongoDelete(Book)
    remove(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({ message: 'Deleted' });
    }
}

export default BookController;
