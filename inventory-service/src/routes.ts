import express from "express";

export const makeRoutes = (app: express.Application, callback: any, controller: any) => {
    app.get("/inventorys", callback(controller.getInventorys));
    app.post("/inventorys", callback(controller.createInventory));
    app.put("/inventorys/:id", callback(controller.updateInventory));
    app.delete("/inventorys/:id", callback(controller.deleteInventory));
    app.get("/inventorys/:id", callback(controller.getInventoryById));
    app.post("/inventorys/check", callback(controller.checkInventory));
};