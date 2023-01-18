import { enums } from "../enums";
import { OrderLineItems } from "./OrderLineItems";

export class Order {
    private id: string;
    private orderNumber: string;
    private lineItems: OrderLineItems[];

    constructor(id: string, orderNumber: string, lineItems: OrderLineItems[]) {

        // Validating inputs
        if(id === undefined || id === null || id === '') {
            throw new Error(enums.ErrorsEnum.ORDER_ID_REQUIRED);
        }

        if(orderNumber === undefined || orderNumber === null || orderNumber === '') {
            throw new Error(enums.ErrorsEnum.ORDER_NUMBER_REQUIRED);
        }

        if(lineItems === undefined || lineItems === null || lineItems.length === 0) {
            throw new Error(enums.ErrorsEnum.ORDER_LINE_ITEMS_REQUIRED);
        }


        this.id = id;
        this.orderNumber = orderNumber;
        this.lineItems = lineItems;
    }

    static fromJson(json: any): Order {
        const items = OrderLineItems.fromJsonArray(json.lineItems);
        return new Order(json.id, json.name, items);
    }

    static fromJsonArray(json: any[]): Order[] {
        return json.map(Order.fromJson);
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.orderNumber,
            lineItems: this.lineItems.map(li => li.toJson()),
        };
    }

    toString(): string {
        return `Product { id: ${this.id}, name: ${this.orderNumber}, lineItems: ${this.lineItems} }`;
    }

    getId(): string {
        return this.id;
    }

    getOrderNumber(): string {
        return this.orderNumber;
    }

    getLineItems(): OrderLineItems[] {
        return this.lineItems;
    }

}