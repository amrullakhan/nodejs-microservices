import { Inventory } from "../../entities/models/Inventory";
import { InventoryRequest } from "./InventoryRequest";

export interface InventoryDBInterface {
    createInventory(inventory: Inventory): Promise<Inventory>;
    getInventoryById(id: string): Promise<Inventory | undefined>;
    getInventorys(): Promise<Inventory[]>;
    updateInventory(id: string, newInventory: Inventory): Promise<Inventory>;
    deleteInventory(id: string): Promise<boolean>;
    getInventoryBySkuCodes(codes: string[]): Promise<Inventory[]>;
}