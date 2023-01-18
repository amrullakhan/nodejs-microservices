import { enums } from "../enums";

export class Inventory {
    private id: string;
    private skuCode: string;
    private quantity: number;

    constructor(id: string, skuCode: string, quantity: number) {

        // Validating inputs
        if(id === undefined || id === null || id === '') {
            throw new Error(enums.ErrorsEnum.INVENTORY_ID_REQUIRED);
        }

        if(skuCode === undefined || skuCode === null || skuCode === '') {
            throw new Error(enums.ErrorsEnum.INVENTORY_SKUCODE_REQUIRED);
        }

        if(quantity === undefined || quantity === null || quantity < 0) {
            throw new Error(enums.ErrorsEnum.INVENTORY_QUANTITY_REQUIRED);
        }

        this.id = id;
        this.skuCode = skuCode;
        this.quantity = quantity;
    }

    static fromJson(json: any): Inventory {
        return new Inventory(json.id, json.skuCode, json.quantity);
    }

    static fromJsonArray(json: any[]): Inventory[] {
        return json.map(Inventory.fromJson);
    }

    toJson(): any {
        return {
            id: this.id,
            skuCode: this.skuCode,
            quantity: this.quantity,
        };
    }

    toString(): string {
        return `Inventory { id: ${this.id}, skuCode: ${this.skuCode}, quantity: ${this.quantity} }`;
    }

    getId(): string {
        return this.id;
    }

    getSkuCode(): string {
        return this.skuCode;
    }

    getQuantity(): number {
        return this.quantity;
    }
}