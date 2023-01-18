import { OrderLineItemsRequest } from "./OrderLineItemsRequest";

export interface OrderRequest {
    orderNumber: string;
    lineItems: OrderLineItemsRequest[];
}
