import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
    console.error(err);
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ errors: err.serialize() });
    }
    return res.status(500).send('Something went wrong, please try again');
};
