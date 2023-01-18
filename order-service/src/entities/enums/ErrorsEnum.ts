export enum ErrorsEnum {
    ORDER_ID_REQUIRED = 'Order id is required',
    ORDER_NUMBER_REQUIRED = 'Order number is required',
    ORDER_LINE_ITEMS_REQUIRED = 'Order line items is required',

    ORDER_LINE_ITEMS_ID_REQUIRED = 'Order line items id is required',
    ORDER_LINE_ITEMS_SKU_CODE_REQUIRED = 'Order line items sku code is required',
    ORDER_LINE_ITEMS_PRICE_REQUIRED = 'Order line items price is required',
    ORDER_LINE_ITEMS_QUANTITY_REQUIRED = 'Order line items quantity is required',

    ORDER_NOT_FOUND = 'Order not found',
    ORDER_UPDATE_FAILED = 'Failed to update the Order',
    ORDER_CREATE_FAILED = 'Failed to create the Order',
    ORDER_DELETE_FAILED = 'Failed to delete the Order',

    INVENTORY_SERVICE_URL_NOT_FOUND = 'Inventory service url not found',
    INVENTORY_SERVICE_UNAVAILABLE = 'Inventory service unavailable',
};