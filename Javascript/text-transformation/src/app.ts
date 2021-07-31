import express from 'express';
import 'express-async-errors';
import { textRouter } from './routes/text';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/NotFoundError';

const app = express();
app.set('trust proxy', true);
app.use(express.json());

app.use(textRouter);

app.all('*', async () => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };
