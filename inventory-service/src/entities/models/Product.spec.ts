import { enums } from "./../enums";
import { Inventory } from "./Inventory";

describe("Inventory", () => {
  it("should create an instance", () => {
    expect(new Inventory("1", "Inventory 1", "Desc", 10)).toBeTruthy();
  });

  it("should create an instance with provided values", () => {
    const inventory = new Inventory("1", "Inventory 1", "Desc", 10);

    expect(inventory.getId()).toBe("1");
    expect(inventory.getName()).toBe("Inventory 1");
    expect(inventory.getDescription()).toBe("Desc");
    expect(inventory.getPrice()).toBe(10);
  });

  it("should throw an error if id is not provided", () => {
    expect(() => new Inventory("", "Inventory 1", "Desc", 10)).toThrow(
      new Error(enums.ErrorsEnum.INVENTORY_ID_REQUIRED)
    );
  });

  it("should throw an error if name is not provided", () => {
    expect(() => new Inventory("1", "", "Desc", 10)).toThrow(
      new Error(enums.ErrorsEnum.INVENTORY_SKUCODE_REQUIRED)
    );
  });

  it("should throw an error if description is not provided", () => {
    expect(() => new Inventory("1", "Inventory 1", "", 10)).toThrow(
      new Error(enums.ErrorsEnum.INVENTORY_QUANTITY_REQUIRED)
    );
  });

  it("should throw an error if price is not provided", () => {
    expect(() => new Inventory("1", "Inventory 1", "Desc", 0)).toThrow(
      new Error(enums.ErrorsEnum.INVENTORY_PRICE_REQUIRED)
    );
  });

  it("should throw an error if price is less than 0", () => {
    expect(() => new Inventory("1", "Inventory 1", "Desc", -1)).toThrow(
      new Error(enums.ErrorsEnum.INVENTORY_PRICE_REQUIRED)
    );
  });

    it("should return a json object", () => {
        const inventory = new Inventory("1", "Inventory 1", "Desc", 10);

        expect(inventory.toJson()).toEqual({
            id: "1",
            name: "Inventory 1",
            description: "Desc",
            price: 10
        });
    });

    it("should return a string", () => {
        const inventory = new Inventory("1", "Inventory 1", "Desc", 10);

        expect(inventory.toString()).toBe("Inventory { id: 1, name: Inventory 1, description: Desc, price: 10 }");
    });

    it("should return a json object from json", () => {
        const inventory = Inventory.fromJson({
            id: "1",
            name: "Inventory 1",
            description: "Desc",
            price: 10
        });
        expect(inventory.toJson()).toEqual({
            id: "1",
            name: "Inventory 1",
            description: "Desc",
            price: 10
        });
    });

    it("should return a json array from json array", () => {
        const inventorys = Inventory.fromJsonArray([{
            id: "1",
            name: "Inventory 1",
            description: "Desc",
            price: 10
        }]);
        expect(inventorys.length).toEqual(1);
    });
});
