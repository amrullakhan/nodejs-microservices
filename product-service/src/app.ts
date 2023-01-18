import express from 'express';
import {makeExpressCallback } from './interfaceAdapters/middlewares';
import { makeRoutes } from './routes';
import { productController } from './interfaceAdapters/controllers';

const app = express();

app.use(express.json());

makeRoutes(app, makeExpressCallback, productController);

export default app;