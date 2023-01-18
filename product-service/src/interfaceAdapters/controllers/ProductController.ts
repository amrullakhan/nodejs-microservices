import {
  HttpRequest,
  HttpResponse,
  ProductRequest,
  ProductServiceInterface,
} from "useCases/interfaces";

export class ProductController {
  private productService: ProductServiceInterface;
  private handleProductErrors: any;

  constructor(productService: ProductServiceInterface, handleProductErrors: any) {
    this.productService = productService;
    this.handleProductErrors = handleProductErrors;
  }

  getProducts = async () => {
    try {
      const products = await this.productService.getProducts();

      return {
        statusCode: 200,
        body: products,
      };
    } catch (error) {
      console.log(error);
      return this.handleProductErrors(error);
    }
  };

  getProductById = async (request: HttpRequest) => {
    try {
      const product = await this.productService.getProductById(
        request.params.id
      );

      return {
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      console.log(error);
      return this.handleProductErrors(error);
    }
  };

  createProduct = async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      const newProduct: ProductRequest = request.body;

      const product = await this.productService.createProduct(newProduct);

      return {
        statusCode: 201,
        body: product,
      };
    } catch (error) {
      console.log(error);
      return this.handleProductErrors(error);
    }
  };

  updateProduct = async (request: HttpRequest) => {
    try {
      const product = await this.productService.updateProduct(request.params.id, request.body);

      return {
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      console.log(error);
      return this.handleProductErrors(error);
    }
  };

  deleteProduct = async (request: HttpRequest) => {
    try {
      const product = await this.productService.deleteProduct(request.params.id);

      return {
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      console.log(error);
      return this.handleProductErrors(error);
    }
  };
}
