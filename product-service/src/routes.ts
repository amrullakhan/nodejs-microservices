import express from "express";

export const makeRoutes = (app: express.Application, callback: any, controller: any) => {
    app.get("/products", callback(controller.getProducts));
    app.post("/products", callback(controller.createProduct));
    app.put("/products/:id", callback(controller.updateProduct));
    app.delete("/products/:id", callback(controller.deleteProduct));
    app.get("/products/:id", callback(controller.getProductById));
};