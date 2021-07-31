import express, { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';
import { ITextData } from '../services/ITextData';
import { Transformer } from '../services/Transformer';

const router = express.Router();

router.post('/api/v1/text', validateRequest, async (req: Request, res: Response) => {
    const data = matchedData(req, {
        includeOptionals: false,
    }) as ITextData;
    const output = await Transformer.transform(data);
    res.status(200).json({
        status: 'success',
        data: {
            text: output,
        },
    });
});

export { router as textRouter };
