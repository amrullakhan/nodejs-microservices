import {
  HttpRequest,
  HttpResponse,
  InventoryRequest,
  InventoryServiceInterface,
} from "useCases/interfaces";

export class InventoryController {
  private inventoryService: InventoryServiceInterface;
  private handleInventoryErrors: any;

  constructor(inventoryService: InventoryServiceInterface, handleInventoryErrors: any) {
    this.inventoryService = inventoryService;
    this.handleInventoryErrors = handleInventoryErrors;
  }

  getInventorys = async () => {
    try {
      const inventorys = await this.inventoryService.getInventorys();

      return {
        statusCode: 200,
        body: inventorys,
      };
    } catch (error) {
      console.log(error);
      return this.handleInventoryErrors(error);
    }
  };

  getInventoryById = async (request: HttpRequest) => {
    try {
      const inventory = await this.inventoryService.getInventoryById(
        request.params.id
      );

      return {
        statusCode: 200,
        body: inventory,
      };
    } catch (error) {
      console.log(error);
      return this.handleInventoryErrors(error);
    }
  };

  createInventory = async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      const newInventory: InventoryRequest = request.body;

      const inventory = await this.inventoryService.createInventory(newInventory);

      return {
        statusCode: 201,
        body: inventory,
      };
    } catch (error) {
      console.log(error);
      return this.handleInventoryErrors(error);
    }
  };

  updateInventory = async (request: HttpRequest) => {
    try {
      const inventory = await this.inventoryService.updateInventory(request.params.id, request.body);

      return {
        statusCode: 200,
        body: inventory,
      };
    } catch (error) {
      console.log(error);
      return this.handleInventoryErrors(error);
    }
  };
  
  checkInventory = async (request: HttpRequest) => {
    try {
      const inventory = await this.inventoryService.checkInventory(request.body);

      return {
        statusCode: 200,
        body: inventory,
      };
    } catch (error) {
      console.log(error);
      return this.handleInventoryErrors(error);
    }
  };

  deleteInventory = async (request: HttpRequest) => {
    try {
      const inventory = await this.inventoryService.deleteInventory(request.params.id);

      return {
        statusCode: 200,
        body: inventory,
      };
    } catch (error) {
      console.log(error);
      return this.handleInventoryErrors(error);
    }
  };
}
