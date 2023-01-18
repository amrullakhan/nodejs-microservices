import { Order } from "../../entities/models/Order";

export interface OrderDBInterface {
    createOrder(order: Order): Promise<Order>;
    getOrderById(id: string): Promise<Order | undefined>;
    getOrders(): Promise<Order[]>;
    updateOrder(id: string, newOrder: Order): Promise<Order>;
    deleteOrder(id: string): Promise<boolean>;
}