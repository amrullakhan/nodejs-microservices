import { mock } from "jest-mock-extended";
import { InventoryService } from "./InventoryService";
import { enums } from "../../entities/enums";
import { IdInterface, InventoryDBInterface } from "../interfaces";
import { Inventory } from "../../entities/models/Inventory";

const mockDB = mock<InventoryDBInterface>();
const mockId = mock<IdInterface>();

describe("InventoryService", () => {
  it("getInventorys: should return a list of inventorys", async () => {
    const inventoryService = new InventoryService(mockDB, mockId);
    mockDB.getInventorys.mockResolvedValue([
      new Inventory("1", "Inventory 1", "Inventory 1 description", 10),
      new Inventory("2", "Inventory 2", "Inventory 2 description", 20),
    ]);
    const inventorys = await inventoryService.getInventorys();
    expect(inventorys.length).toBe(2);
    expect(mockDB.getInventorys).toBeCalledTimes(1);
  });

  it("getInventoryById: should return a inventory by id", async () => {
    const inventoryService = new InventoryService(mockDB, mockId);
    mockDB.getInventoryById.mockResolvedValue(
        new Inventory("1", "Inventory 1", "Inventory 1 description", 10)
    );
    const inventory = await inventoryService.getInventoryById("1");
    expect(inventory?.id).toBe("1");
    expect(mockDB.getInventoryById).toBeCalledTimes(1);
  });

  it("getInventoryById: should throw error when inventory is not found", async () => {
    const inventoryService = new InventoryService(mockDB, mockId);
    mockDB.getInventoryById.mockResolvedValue(undefined);
    try {
      await inventoryService.getInventoryById("100");
      expect(1).toBe(2);
    } catch (e: any) {
      expect(e.message).toBe(enums.ErrorsEnum.INVENTORY_NOT_FOUND);
    }
  });

  it("createInventory: should create a inventory", async () => {
    const inventoryService = new InventoryService(mockDB, mockId);
    mockId.makeId.mockReturnValue("3");
    mockDB.createInventory.mockResolvedValue(
        new Inventory("3", "Inventory 3", "Inventory 3 description", 30)
    );
    const inventory = await inventoryService.createInventory({
      name: "Inventory 3",
      description: "Inventory 3 description",
      price: 30,
    });
    expect(inventory.id).toBe("3");
  });

  it("createInventory: should throw error", async () => {
    const inventoryService = new InventoryService(mockDB, mockId);
    mockId.makeId.mockReturnValue("3");
    mockDB.createInventory.mockRejectedValue(new Error("Error"));
    try {
      await inventoryService.createInventory({
        name: "asdf",
        description: "Inventory 3 description",
        price: 30,
      });
      expect(1).toBe(2);
    } catch (e: any) {
      expect(e.message).toBe(enums.ErrorsEnum.INVENTORY_CREATE_FAILED);
    }
  });

  it("updateInventory: should update a inventory", async () => {
    const inventoryService = new InventoryService(mockDB, mockId);
    mockDB.updateInventory.mockResolvedValue(
        new Inventory("1", "Inventory 1 updated", "Inventory 1 description updated", 10)
    );
    const inventory = await inventoryService.updateInventory("1", {
      name: "Inventory 1 updated",
      description: "Inventory 1 description updated",
      price: 10,
    });
    expect(inventory.name).toBe("Inventory 1 updated");
    expect(mockDB.updateInventory).toBeCalledTimes(1);
  });

  it("updateInventory: should throw error", async () => {
    const inventoryService = new InventoryService(mockDB, mockId);
    mockDB.updateInventory.mockRejectedValue(new Error("Error"));
    try {
      await inventoryService.updateInventory("100", {
        name: "Inventory 1 updated",
        description: "Inventory 1 description updated",
        price: 10,
      });
      expect(1).toBe(2);
    } catch (e: any) {
      expect(e.message).toBe(enums.ErrorsEnum.INVENTORY_UPDATE_FAILED);
    }
  });
  
  it("updateInventory: should throw error when inventory not found", async () => {
    const inventoryService = new InventoryService(mockDB, mockId);
    mockDB.updateInventory.mockRejectedValue(new Error(enums.ErrorsEnum.INVENTORY_NOT_FOUND));
    try {
      await inventoryService.updateInventory("100", {
        name: "Inventory 1 updated",
        description: "Inventory 1 description updated",
        price: 10,
      });
      expect(1).toBe(2);
    } catch (e: any) {
      expect(e.message).toBe(enums.ErrorsEnum.INVENTORY_NOT_FOUND);
    }
  });

  it("deleteInventory: should delete a inventory", async () => {
    const inventoryService = new InventoryService(mockDB, mockId);
    mockDB.deleteInventory.mockResolvedValue(true);
    const result = await inventoryService.deleteInventory("1");
    expect(result).toBe("Inventory 1 deleted");
  });

  it("deleteInventory: should throw error", async () => {
    const inventoryService = new InventoryService(mockDB, mockId);
    mockDB.deleteInventory.mockResolvedValue(false);
    try {
      await inventoryService.deleteInventory("100");
      expect(1).toBe(2);
    } catch (e: any) {
      expect(e.message).toBe(enums.ErrorsEnum.INVENTORY_DELETE_FAILED);
    }
  });
});
