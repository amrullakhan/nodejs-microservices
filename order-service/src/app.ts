import express from "express";
import { makeExpressCallback } from "./interfaceAdapters/middlewares";
import { makeRoutes } from "./routes";
import { makeOrderController } from "./interfaceAdapters/controllers";

const makeApp = (inventoryServiceURLFn: () => string) => {
  const app = express();

  app.use(express.json());

  makeRoutes(
    app,
    makeExpressCallback,
    makeOrderController(inventoryServiceURLFn)
  );

  return app;
};

export {makeApp};
