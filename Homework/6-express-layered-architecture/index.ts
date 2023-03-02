import express from 'express';
import bodyParser from 'body-parser';
import { rootRouter } from './src/router';
import { errorHandler } from './src/middlewares/errorHandler';


const app = express();

app.use(bodyParser.json());

app.use(rootRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is started');
});
