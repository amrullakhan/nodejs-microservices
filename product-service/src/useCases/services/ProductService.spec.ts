import { mock } from "jest-mock-extended";
import { ProductService } from "./ProductService";
import { enums } from "../../entities/enums";
import { IdInterface, ProductDBInterface } from "../interfaces";
import { Product } from "../../entities/models/Product";

const mockDB = mock<ProductDBInterface>();
const mockId = mock<IdInterface>();

describe("ProductService", () => {
  it("getProducts: should return a list of products", async () => {
    const productService = new ProductService(mockDB, mockId);
    mockDB.getProducts.mockResolvedValue([
      new Product("1", "Product 1", "Product 1 description", 10),
      new Product("2", "Product 2", "Product 2 description", 20),
    ]);
    const products = await productService.getProducts();
    expect(products.length).toBe(2);
    expect(mockDB.getProducts).toBeCalledTimes(1);
  });

  it("getProductById: should return a product by id", async () => {
    const productService = new ProductService(mockDB, mockId);
    mockDB.getProductById.mockResolvedValue(
        new Product("1", "Product 1", "Product 1 description", 10)
    );
    const product = await productService.getProductById("1");
    expect(product?.id).toBe("1");
    expect(mockDB.getProductById).toBeCalledTimes(1);
  });

  it("getProductById: should throw error when product is not found", async () => {
    const productService = new ProductService(mockDB, mockId);
    mockDB.getProductById.mockResolvedValue(undefined);
    try {
      await productService.getProductById("100");
      expect(1).toBe(2);
    } catch (e: any) {
      expect(e.message).toBe(enums.ErrorsEnum.PRODUCT_NOT_FOUND);
    }
  });

  it("createProduct: should create a product", async () => {
    const productService = new ProductService(mockDB, mockId);
    mockId.makeId.mockReturnValue("3");
    mockDB.createProduct.mockResolvedValue(
        new Product("3", "Product 3", "Product 3 description", 30)
    );
    const product = await productService.createProduct({
      name: "Product 3",
      description: "Product 3 description",
      price: 30,
    });
    expect(product.id).toBe("3");
  });

  it("createProduct: should throw error", async () => {
    const productService = new ProductService(mockDB, mockId);
    mockId.makeId.mockReturnValue("3");
    mockDB.createProduct.mockRejectedValue(new Error("Error"));
    try {
      await productService.createProduct({
        name: "asdf",
        description: "Product 3 description",
        price: 30,
      });
      expect(1).toBe(2);
    } catch (e: any) {
      expect(e.message).toBe(enums.ErrorsEnum.PRODUCT_CREATE_FAILED);
    }
  });

  it("updateProduct: should update a product", async () => {
    const productService = new ProductService(mockDB, mockId);
    mockDB.updateProduct.mockResolvedValue(
        new Product("1", "Product 1 updated", "Product 1 description updated", 10)
    );
    const product = await productService.updateProduct("1", {
      name: "Product 1 updated",
      description: "Product 1 description updated",
      price: 10,
    });
    expect(product.name).toBe("Product 1 updated");
    expect(mockDB.updateProduct).toBeCalledTimes(1);
  });

  it("updateProduct: should throw error", async () => {
    const productService = new ProductService(mockDB, mockId);
    mockDB.updateProduct.mockRejectedValue(new Error("Error"));
    try {
      await productService.updateProduct("100", {
        name: "Product 1 updated",
        description: "Product 1 description updated",
        price: 10,
      });
      expect(1).toBe(2);
    } catch (e: any) {
      expect(e.message).toBe(enums.ErrorsEnum.PRODUCT_UPDATE_FAILED);
    }
  });
  
  it("updateProduct: should throw error when product not found", async () => {
    const productService = new ProductService(mockDB, mockId);
    mockDB.updateProduct.mockRejectedValue(new Error(enums.ErrorsEnum.PRODUCT_NOT_FOUND));
    try {
      await productService.updateProduct("100", {
        name: "Product 1 updated",
        description: "Product 1 description updated",
        price: 10,
      });
      expect(1).toBe(2);
    } catch (e: any) {
      expect(e.message).toBe(enums.ErrorsEnum.PRODUCT_NOT_FOUND);
    }
  });

  it("deleteProduct: should delete a product", async () => {
    const productService = new ProductService(mockDB, mockId);
    mockDB.deleteProduct.mockResolvedValue(true);
    const result = await productService.deleteProduct("1");
    expect(result).toBe("Product 1 deleted");
  });

  it("deleteProduct: should throw error", async () => {
    const productService = new ProductService(mockDB, mockId);
    mockDB.deleteProduct.mockResolvedValue(false);
    try {
      await productService.deleteProduct("100");
      expect(1).toBe(2);
    } catch (e: any) {
      expect(e.message).toBe(enums.ErrorsEnum.PRODUCT_DELETE_FAILED);
    }
  });
});
