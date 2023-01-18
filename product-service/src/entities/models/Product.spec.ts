import { enums } from "./../enums";
import { Product } from "./Product";

describe("Product", () => {
  it("should create an instance", () => {
    expect(new Product("1", "Product 1", "Desc", 10)).toBeTruthy();
  });

  it("should create an instance with provided values", () => {
    const product = new Product("1", "Product 1", "Desc", 10);

    expect(product.getId()).toBe("1");
    expect(product.getName()).toBe("Product 1");
    expect(product.getDescription()).toBe("Desc");
    expect(product.getPrice()).toBe(10);
  });

  it("should throw an error if id is not provided", () => {
    expect(() => new Product("", "Product 1", "Desc", 10)).toThrow(
      new Error(enums.ErrorsEnum.PRODUCT_ID_REQUIRED)
    );
  });

  it("should throw an error if name is not provided", () => {
    expect(() => new Product("1", "", "Desc", 10)).toThrow(
      new Error(enums.ErrorsEnum.PRODUCT_NAME_REQUIRED)
    );
  });

  it("should throw an error if description is not provided", () => {
    expect(() => new Product("1", "Product 1", "", 10)).toThrow(
      new Error(enums.ErrorsEnum.PRODUCT_DESCRIPTION_REQUIRED)
    );
  });

  it("should throw an error if price is not provided", () => {
    expect(() => new Product("1", "Product 1", "Desc", 0)).toThrow(
      new Error(enums.ErrorsEnum.PRODUCT_PRICE_REQUIRED)
    );
  });

  it("should throw an error if price is less than 0", () => {
    expect(() => new Product("1", "Product 1", "Desc", -1)).toThrow(
      new Error(enums.ErrorsEnum.PRODUCT_PRICE_REQUIRED)
    );
  });

    it("should return a json object", () => {
        const product = new Product("1", "Product 1", "Desc", 10);

        expect(product.toJson()).toEqual({
            id: "1",
            name: "Product 1",
            description: "Desc",
            price: 10
        });
    });

    it("should return a string", () => {
        const product = new Product("1", "Product 1", "Desc", 10);

        expect(product.toString()).toBe("Product { id: 1, name: Product 1, description: Desc, price: 10 }");
    });

    it("should return a json object from json", () => {
        const product = Product.fromJson({
            id: "1",
            name: "Product 1",
            description: "Desc",
            price: 10
        });
        expect(product.toJson()).toEqual({
            id: "1",
            name: "Product 1",
            description: "Desc",
            price: 10
        });
    });

    it("should return a json array from json array", () => {
        const products = Product.fromJsonArray([{
            id: "1",
            name: "Product 1",
            description: "Desc",
            price: 10
        }]);
        expect(products.length).toEqual(1);
    });
});
