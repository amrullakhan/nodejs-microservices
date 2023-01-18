import { mock } from "jest-mock-extended";
import { InventoryController } from "./InventoryController";
import {
  HttpRequest,
  InventoryServiceInterface,
} from "./../../useCases/interfaces";

const mockInventoryService = mock<InventoryServiceInterface>();

const mockHandleInventoryErrors = jest.fn();

const inventoryController = new InventoryController(
  mockInventoryService,
  mockHandleInventoryErrors
);

let request: HttpRequest = {
  body: {},
  query: {},
  params: {
    id: "1",
  },
  ip: "",
  method: "",
  path: "",
  headers: {
    "Content-Type": "",
    Referer: "",
    "User-Agent": "",
  },
};

describe("InventoryController", () => {
  it("getInventorys: should call getInventorys", async () => {
    await inventoryController.getInventorys();
    expect(mockInventoryService.getInventorys).toHaveBeenCalled();
  });

  it("getInventorys: should call handleInventoryErrors on error", async () => {
    mockInventoryService.getInventorys.mockRejectedValueOnce("error");
    await inventoryController.getInventorys();
    expect(mockInventoryService.getInventorys).toHaveBeenCalled();
  });

  it("getInventoryById: should call getInventoryById", async () => {
    await inventoryController.getInventoryById(request);
    expect(mockInventoryService.getInventoryById).toHaveBeenCalled();
    expect(mockInventoryService.getInventoryById).toHaveBeenCalledWith(request.params.id);
  });

  it("getInventoryById: should call handleInventoryErrors on error", async () => {
    mockInventoryService.getInventoryById.mockRejectedValueOnce("error");
    await inventoryController.getInventoryById(request);
    expect(mockInventoryService.getInventoryById).toHaveBeenCalled();
    expect(mockInventoryService.getInventoryById).toHaveBeenCalledWith(request.params.id);
  });

  it("createInventory: should call createInventory", async () => {
    await inventoryController.createInventory(request);
    expect(mockInventoryService.createInventory).toHaveBeenCalled();
    expect(mockInventoryService.createInventory).toHaveBeenCalledWith(request.body);
  });

  it("createInventory: should call handleInventoryErrors on error", async () => {
    mockInventoryService.createInventory.mockRejectedValueOnce("error");
    await inventoryController.createInventory(request);
    expect(mockInventoryService.createInventory).toHaveBeenCalled();
    expect(mockInventoryService.createInventory).toHaveBeenCalledWith(request.body);
  });
  
  it("updateInventory: should call updateInventory", async () => {
    await inventoryController.updateInventory(request);
    expect(mockInventoryService.updateInventory).toHaveBeenCalled();
    expect(mockInventoryService.updateInventory).toHaveBeenCalledWith(request.params.id, request.body);
  });

  it("updateInventory: should call handleInventoryErrors on error", async () => {
    mockInventoryService.updateInventory.mockRejectedValueOnce("error");
    await inventoryController.updateInventory(request);
    expect(mockInventoryService.updateInventory).toHaveBeenCalled();
    expect(mockInventoryService.updateInventory).toHaveBeenCalledWith(request.params.id, request.body);
  });

  it("deleteInventory: should call deleteInventory", async () => {
    await inventoryController.deleteInventory(request);
    expect(mockInventoryService.deleteInventory).toHaveBeenCalled();
    expect(mockInventoryService.deleteInventory).toHaveBeenCalledWith(request.params.id);
  });

  it("deleteInventory: should call handleInventoryErrors on error", async () => {
    mockInventoryService.deleteInventory.mockRejectedValueOnce("error");
    await inventoryController.deleteInventory(request);
    expect(mockInventoryService.deleteInventory).toHaveBeenCalled();
    expect(mockInventoryService.deleteInventory).toHaveBeenCalledWith(request.params.id);
  });
});
