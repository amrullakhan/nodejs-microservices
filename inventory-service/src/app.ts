import express from 'express';
import {makeExpressCallback } from './interfaceAdapters/middlewares';
import { makeRoutes } from './routes';
import { inventoryController } from './interfaceAdapters/controllers';

const app = express();

app.use(express.json());

makeRoutes(app, makeExpressCallback, inventoryController);

export default app;