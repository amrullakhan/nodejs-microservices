import { InventoryCheckResponse } from "./InventoryCheckResponse";
import { InventoryRequest } from "./InventoryRequest";
import { InventoryResponse } from "./InventoryResponse";

export interface InventoryServiceInterface {
    getInventorys(): Promise<InventoryResponse[]>;
    getInventoryById(id: string): Promise<InventoryResponse | undefined>;
    createInventory(newInventory: InventoryRequest): Promise<InventoryResponse>;
    updateInventory(id: string, newInventory: InventoryRequest): Promise<InventoryResponse>;
    deleteInventory(id: string): Promise<string>;
    checkInventory(inventory: InventoryRequest[]): Promise<InventoryCheckResponse[]>;
}