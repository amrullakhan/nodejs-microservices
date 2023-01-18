import { OrderService } from "../../useCases/services/OrderService";
import { OrderController } from "./OrderController";
import {errorHandlers} from "../error";
import { IdHandler, orderDB } from "../../infrastructures/data";

const makeOrderController = (getInventoryURL: () => string) => {
    const orderService = new OrderService(orderDB, IdHandler, getInventoryURL);

    const orderController = new OrderController(orderService, errorHandlers.handleOrderErrors);
    
    return orderController;
}

export {
    makeOrderController,
};