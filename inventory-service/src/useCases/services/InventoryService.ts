import { enums } from "../../entities/enums";
import { InventoryServiceInterface, InventoryRequest, InventoryResponse, InventoryDBInterface, IdInterface, InventoryCheckResponse } from "useCases/interfaces";
import { Inventory } from "../../entities/models/Inventory";

export class InventoryService implements InventoryServiceInterface {
    private InventoryDB: InventoryDBInterface;
    private Id: IdInterface;

    constructor(InventoryDB: InventoryDBInterface, Id: IdInterface) {
        this.InventoryDB = InventoryDB;
        this.Id = Id;
    }

    async checkInventory(inventory: InventoryRequest[]): Promise<InventoryCheckResponse[]> {
        const inventories = await this.InventoryDB.getInventoryBySkuCodes(inventory.map((i) => i.skuCode));

        const result: InventoryCheckResponse[] = [];

        inventory.forEach(invt => {
            const inv = inventories.find((i) => i.getSkuCode() === invt.skuCode);
            if (inv) {
                result.push({
                    skuCode: inv.getSkuCode(),
                    isAvailable: inv.getQuantity() >= invt.quantity,
                });
            } else {
                result.push({
                    skuCode: invt.skuCode,
                    isAvailable: false,
                });
            }
        });
        
        return result;
    }

    inventoryToResponse(inventory: Inventory): InventoryResponse {
        return {
            id: inventory.getId(),
            skuCode: inventory.getSkuCode(),
            quantity: inventory.getQuantity(),
        };
    }

    async getInventorys(): Promise<InventoryResponse[]> {
        const inventorys = await this.InventoryDB.getInventorys();
        return inventorys.map((inventory) => {
            return this.inventoryToResponse(inventory);
        });
    }

    async getInventoryById(id: string): Promise<InventoryResponse | undefined> {
        const inventory = await this.InventoryDB.getInventoryById(id);
        if (!inventory) {
            throw new Error(enums.ErrorsEnum.INVENTORY_NOT_FOUND);
        }

        return this.inventoryToResponse(inventory);
    }

    async createInventory(newInventory: InventoryRequest): Promise<InventoryResponse> {
        const inventory = new Inventory(this.Id.makeId(), newInventory.skuCode, newInventory.quantity);

        try {
            await this.InventoryDB.createInventory(inventory);
            return this.inventoryToResponse(inventory);
        }
        catch(error) {
            console.log(error);
            throw new Error(enums.ErrorsEnum.INVENTORY_CREATE_FAILED);
        }
    }

    async updateInventory(id: string, newInventory: InventoryRequest): Promise<InventoryResponse> {
        const inventory = new Inventory(id, newInventory.skuCode, newInventory.quantity);
        try {
            await this.InventoryDB.updateInventory(id, inventory);
            return this.inventoryToResponse(inventory);
        } catch(e: any) {
            if(e.message === enums.ErrorsEnum.INVENTORY_NOT_FOUND) {
                throw new Error(enums.ErrorsEnum.INVENTORY_NOT_FOUND);
            }
            throw new Error(enums.ErrorsEnum.INVENTORY_UPDATE_FAILED);
        }
    }

    async deleteInventory(id: string): Promise<string> {
        const result = await this.InventoryDB.deleteInventory(id);
        if(!result) {
            throw new Error(enums.ErrorsEnum.INVENTORY_DELETE_FAILED);
        }
        return `Inventory ${id} deleted`;
    }
}
