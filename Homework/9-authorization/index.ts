import express from 'express';
import bodyParser from 'body-parser';
import {rootRouter} from './src/router';
import {errorHandler} from './src/middlewares/errorHandler';
import {container, init} from "./init";
import {RequestContext} from "@mikro-orm/core";

init().then(() => {
    const app = express();

    app.use(bodyParser.json());
    app.use((req, res, next) => RequestContext.create(container.orm.em, next));

    app.use(rootRouter);
    app.use(errorHandler);

    app.listen(3000, () => {
        console.log('Server is started');
    });

})

