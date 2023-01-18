import express from "express";

export const makeRoutes = (app: express.Application, callback: any, controller: any) => {
    app.get("/orders", callback(controller.getOrders));
    app.post("/orders", callback(controller.createOrder));
    app.put("/orders/:id", callback(controller.updateOrder));
    app.delete("/orders/:id", callback(controller.deleteOrder));
    app.get("/orders/:id", callback(controller.getOrderById));
};