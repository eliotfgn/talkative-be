import Express, { Application, json } from 'express';
import cors from 'cors';
import logger from './utils/logger';
import authRouter from './routers/auth';

const app: Application = Express();

app.use(cors());
app.use(json());

app.use('/auth', authRouter);

app.listen(5050, () => {
  logger.info('App started on port 5050.');
});
