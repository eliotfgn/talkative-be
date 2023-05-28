import Express, { Application, json } from 'express';
import cors from 'cors';
import logger, { requestLog } from './utils/logger';
import authRouter from './routers/auth';
import userRouter from './routers/users';
import { verifyToken } from './middlewares/auth';

const app: Application = Express();

app.use(cors());
app.use(json());

app.use(requestLog);

app.use('/auth', authRouter);

app.use(verifyToken);

app.use('/users', userRouter);

app.listen(5050, () => {
  logger.info('App started on port 5050.');
});
