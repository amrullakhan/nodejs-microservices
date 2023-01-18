import { InventoryService } from "./../../useCases/services/InventoryService";
import { InventoryController } from "./InventoryController";
import {errorHandlers} from "./../error";
import { IdHandler, inventoryDB } from "./../../infrastructures/data";


const inventoryService = new InventoryService(inventoryDB, IdHandler);

const inventoryController = new InventoryController(inventoryService, errorHandlers.handleInventoryErrors);

export {
    inventoryController,
};