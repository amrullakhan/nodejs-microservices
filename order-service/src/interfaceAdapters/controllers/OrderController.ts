import {
  HttpRequest,
  HttpResponse,
  OrderRequest,
  OrderServiceInterface,
} from "useCases/interfaces";

export class OrderController {
  private productService: OrderServiceInterface;
  private handleOrderErrors: any;

  constructor(productService: OrderServiceInterface, handleOrderErrors: any) {
    this.productService = productService;
    this.handleOrderErrors = handleOrderErrors;
  }

  getOrders = async () => {
    try {
      const products = await this.productService.getOrders();

      return {
        statusCode: 200,
        body: products,
      };
    } catch (error) {
      console.log(error);
      return this.handleOrderErrors(error);
    }
  };

  getOrderById = async (request: HttpRequest) => {
    try {
      const product = await this.productService.getOrderById(
        request.params.id
      );

      return {
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      console.log(error);
      return this.handleOrderErrors(error);
    }
  };

  createOrder = async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      const newOrder: OrderRequest = request.body;

      const product = await this.productService.createOrder(newOrder);

      return {
        statusCode: 201,
        body: product,
      };
    } catch (error) {
      console.log(error);
      return this.handleOrderErrors(error);
    }
  };

  updateOrder = async (request: HttpRequest) => {
    try {
      const product = await this.productService.updateOrder(request.params.id, request.body);

      return {
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      console.log(error);
      return this.handleOrderErrors(error);
    }
  };

  deleteOrder = async (request: HttpRequest) => {
    try {
      const product = await this.productService.deleteOrder(request.params.id);

      return {
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      console.log(error);
      return this.handleOrderErrors(error);
    }
  };
}
