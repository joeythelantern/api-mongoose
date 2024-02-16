import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export function MongoUpdate(model: Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const document = await model.findById(req.params.id);

                if (!document) {
                    return res.status(404).json({ message: 'not found' });
                }

                document.set({ ...req.body });

                await document.save();

                req.mongoUpdate = document;
            } catch (error) {
                logging.error(error);

                return res.status(400).json(error);
            }

            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
