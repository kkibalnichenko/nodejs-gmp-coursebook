import express from 'express';
import bodyParser from 'body-parser';
import { init } from './init';
import { rootRouter } from './src/router';
import { errorHandler } from './src/middlewares/errorHandler';
process.on('uncaughtException', async (error) => {
  console.error('UncaughtException', error);
  await process.exit(1);
});

process.on('exit', (code) => {
  console.error(`Exit with code: ${code}`);
});

init().then(async () => {
  try {
    const app = express();

    app.use(bodyParser.json());

    app.use(rootRouter);
    app.use(errorHandler);

    app.listen(3001, () => {
      console.log('Server is started');
    });
  } catch (error) {
    console.log(error);
  }
});
