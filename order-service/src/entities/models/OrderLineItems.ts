import { enums } from "../enums";

export class OrderLineItems {
  private id: string;
  private skuCode: string;
  private price: number;
  private quantity: number;

  constructor(id: string, skuCode: string, price: number, quantity: number) {
    // Validating inputs
    if (id === undefined || id === null || id === "") {
      throw new Error(enums.ErrorsEnum.ORDER_LINE_ITEMS_ID_REQUIRED);
    }

    if (skuCode === undefined || skuCode === null || skuCode === "") {
      throw new Error(enums.ErrorsEnum.ORDER_LINE_ITEMS_SKU_CODE_REQUIRED);
    }

    if (price === undefined || price === null || price === 0) {
      throw new Error(enums.ErrorsEnum.ORDER_LINE_ITEMS_PRICE_REQUIRED);
    }

    if (quantity === undefined || quantity === null || quantity === 0) {
      throw new Error(enums.ErrorsEnum.ORDER_LINE_ITEMS_QUANTITY_REQUIRED);
    }

    this.id = id;
    this.skuCode = skuCode;
    this.price = price;
    this.quantity = quantity;
  }

  static fromJson(json: any): OrderLineItems {
    return new OrderLineItems(json.id, json.skuCode, json.price, json.quantity);
  }

  static fromJsonArray(json: any[]): OrderLineItems[] {
    return json.map(OrderLineItems.fromJson);
  }

  toJson(): any {
    return {
      id: this.id,
      skuCode: this.skuCode,
      price: this.price,
      quantity: this.quantity,
    };
  }

  toString(): string {
    return `OrderLineItems { id: ${this.id}, skuCode: ${this.skuCode}, price: ${this.price}, quantity: ${this.quantity} }`;
  }

  getId(): string {
    return this.id;
  }

  getSkuCode(): string {
    return this.skuCode;
  }

  getPrice(): number {
    return this.price;
  }

  getQuantity(): number {
    return this.quantity;
  }
}
