import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/RequestValidationError';
import validator from '../services/validator';

export const validateRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validator().map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    next();
};
