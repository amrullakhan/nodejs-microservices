import fetch from "node-fetch";
import { enums } from "../../entities/enums";
import { OrderServiceInterface, OrderRequest, OrderResponse, OrderDBInterface, IdInterface, InventoryCheckResponse } from "useCases/interfaces";
import { Order } from "../../entities/models/Order";
import { OrderLineItems } from "../../entities/models/OrderLineItems";

export class OrderService implements OrderServiceInterface {
    private orderDB: OrderDBInterface;
    private Id: IdInterface;
    private getInventoryUrl: () => string;

    constructor(orderDB: OrderDBInterface, Id: IdInterface, getInventoryUrl: () => string) {
        this.orderDB = orderDB;
        this.Id = Id;
        this.getInventoryUrl = getInventoryUrl;
    }

    OrderToResponse(order: Order): OrderResponse {
        return {
            id: order.getId(),
            orderNumber: order.getOrderNumber(),
            lineItems: order.getLineItems().map((lineItem: OrderLineItems) => {
                return {
                    id: lineItem.getId(),
                    quantity: lineItem.getQuantity(),
                    skuCode: lineItem.getSkuCode(),
                    price: lineItem.getPrice(),
                };
            }),
        };
    }

    async getOrders(): Promise<OrderResponse[]> {
        const Orders = await this.orderDB.getOrders();
        return Orders.map((Order) => {
            return this.OrderToResponse(Order);
        });
    }

    async getOrderById(id: string): Promise<OrderResponse | undefined> {
        const Order = await this.orderDB.getOrderById(id);
        if (!Order) {
            throw new Error(enums.ErrorsEnum.ORDER_NOT_FOUND);
        }

        return this.OrderToResponse(Order);
    }

    async checkInventory(lineItems: OrderLineItems[]) {
        const inventoryServiceURL = this.getInventoryUrl();
        // const inventoryServiceURL = process.env.INVENTORY_SERVICE_URL;
        // if(!inventoryServiceURL) {
        //     throw new Error(enums.ErrorsEnum.INVENTORY_SERVICE_URL_NOT_FOUND);
        // }

        try {
            const inventoryRequest = lineItems.map(li => {
                return {
                    skuCode: li.getSkuCode(),
                    quantity: li.getQuantity(),
                };
            });

            const inventoryResponse = await fetch(`${inventoryServiceURL}/check`, {
                method: 'POST',
                body: JSON.stringify(inventoryRequest),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(inventoryResponse.status !== 200) {
                throw new Error(enums.ErrorsEnum.INVENTORY_SERVICE_UNAVAILABLE);
            }

            const inventoryChecks: InventoryCheckResponse[] = (await inventoryResponse.json()) as InventoryCheckResponse[];

            // inventoryChecks.push(...inventoryResponseJson);

            const inventoryCheckFailed = inventoryChecks.find(ic => !ic.isAvailable);

            if(inventoryCheckFailed) {
                throw new Error(enums.ErrorsEnum.ORDER_CREATE_FAILED);
            }
            
        } catch(error) {
            console.log(error);
            throw new Error(enums.ErrorsEnum.INVENTORY_SERVICE_UNAVAILABLE);
        }

    }

    async createOrder(newOrder: OrderRequest): Promise<OrderResponse> {
        
        
        const lineItems = newOrder.lineItems.map(li => {
            return new OrderLineItems(this.Id.makeId(), li.skuCode, li.price, li.quantity);
        });
        const order = new Order(this.Id.makeId(), newOrder.orderNumber, lineItems);

        await this.checkInventory(lineItems);

        try {
            await this.orderDB.createOrder(order);
            return this.OrderToResponse(order);
        }
        catch(error) {
            console.log(error);
            throw new Error(enums.ErrorsEnum.ORDER_CREATE_FAILED);
        }
    }

    async updateOrder(id: string, newOrder: OrderRequest): Promise<OrderResponse> {
        const lineItems = newOrder.lineItems.map(li => {
            return new OrderLineItems(this.Id.makeId(), li.skuCode, li.price, li.quantity);
        });
        const order = new Order(this.Id.makeId(), newOrder.orderNumber, lineItems);

        try {
            await this.orderDB.updateOrder(id, order);
            return this.OrderToResponse(order);
        } catch(e: any) {
            if(e.message === enums.ErrorsEnum.ORDER_NOT_FOUND) {
                throw new Error(enums.ErrorsEnum.ORDER_NOT_FOUND);
            }
            throw new Error(enums.ErrorsEnum.ORDER_UPDATE_FAILED);
        }
    }

    async deleteOrder(id: string): Promise<string> {
        const result = await this.orderDB.deleteOrder(id);
        if(!result) {
            throw new Error(enums.ErrorsEnum.ORDER_DELETE_FAILED);
        }
        return `Order ${id} deleted`;
    }
}
