import { mock } from "jest-mock-extended";
import { ProductController } from "./ProductController";
import {
  HttpRequest,
  ProductServiceInterface,
} from "./../../useCases/interfaces";

const mockProductService = mock<ProductServiceInterface>();

const mockHandleProductErrors = jest.fn();

const productController = new ProductController(
  mockProductService,
  mockHandleProductErrors
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

describe("ProductController", () => {
  it("getProducts: should call getProducts", async () => {
    await productController.getProducts();
    expect(mockProductService.getProducts).toHaveBeenCalled();
  });

  it("getProducts: should call handleProductErrors on error", async () => {
    mockProductService.getProducts.mockRejectedValueOnce("error");
    await productController.getProducts();
    expect(mockProductService.getProducts).toHaveBeenCalled();
  });

  it("getProductById: should call getProductById", async () => {
    await productController.getProductById(request);
    expect(mockProductService.getProductById).toHaveBeenCalled();
    expect(mockProductService.getProductById).toHaveBeenCalledWith(request.params.id);
  });

  it("getProductById: should call handleProductErrors on error", async () => {
    mockProductService.getProductById.mockRejectedValueOnce("error");
    await productController.getProductById(request);
    expect(mockProductService.getProductById).toHaveBeenCalled();
    expect(mockProductService.getProductById).toHaveBeenCalledWith(request.params.id);
  });

  it("createProduct: should call createProduct", async () => {
    await productController.createProduct(request);
    expect(mockProductService.createProduct).toHaveBeenCalled();
    expect(mockProductService.createProduct).toHaveBeenCalledWith(request.body);
  });

  it("createProduct: should call handleProductErrors on error", async () => {
    mockProductService.createProduct.mockRejectedValueOnce("error");
    await productController.createProduct(request);
    expect(mockProductService.createProduct).toHaveBeenCalled();
    expect(mockProductService.createProduct).toHaveBeenCalledWith(request.body);
  });
  
  it("updateProduct: should call updateProduct", async () => {
    await productController.updateProduct(request);
    expect(mockProductService.updateProduct).toHaveBeenCalled();
    expect(mockProductService.updateProduct).toHaveBeenCalledWith(request.params.id, request.body);
  });

  it("updateProduct: should call handleProductErrors on error", async () => {
    mockProductService.updateProduct.mockRejectedValueOnce("error");
    await productController.updateProduct(request);
    expect(mockProductService.updateProduct).toHaveBeenCalled();
    expect(mockProductService.updateProduct).toHaveBeenCalledWith(request.params.id, request.body);
  });

  it("deleteProduct: should call deleteProduct", async () => {
    await productController.deleteProduct(request);
    expect(mockProductService.deleteProduct).toHaveBeenCalled();
    expect(mockProductService.deleteProduct).toHaveBeenCalledWith(request.params.id);
  });

  it("deleteProduct: should call handleProductErrors on error", async () => {
    mockProductService.deleteProduct.mockRejectedValueOnce("error");
    await productController.deleteProduct(request);
    expect(mockProductService.deleteProduct).toHaveBeenCalled();
    expect(mockProductService.deleteProduct).toHaveBeenCalledWith(request.params.id);
  });
});
