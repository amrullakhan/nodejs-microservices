import { OrderLineItemsResponse } from "./OrderLineItemsResponse";

export interface OrderResponse {
    id: string;
    orderNumber: string;
    lineItems: OrderLineItemsResponse[];
}
