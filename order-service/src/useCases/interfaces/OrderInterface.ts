import { OrderRequest } from "./OrderRequest";
import { OrderResponse } from "./OrderResponse";

export interface OrderServiceInterface {
    getOrders(): Promise<OrderResponse[]>;
    getOrderById(id: string): Promise<OrderResponse | undefined>;
    createOrder(newProduct: OrderRequest): Promise<OrderResponse>;
    updateOrder(id: string, newProduct: OrderRequest): Promise<OrderResponse>;
    deleteOrder(id: string): Promise<string>;
}