import { HttpResponse } from "../../useCases/interfaces";
import { enums } from "../../entities/enums";

export const handleOrderErrors = (error: any) :  HttpResponse => {
  switch (error.message) {
    case enums.ErrorsEnum.ORDER_NOT_FOUND:
      return {
        statusCode: 404,
        body: { message: "Order not found"},
      };
    case enums.ErrorsEnum.ORDER_ID_REQUIRED:
    case enums.ErrorsEnum.ORDER_NUMBER_REQUIRED:
    case enums.ErrorsEnum.ORDER_LINE_ITEMS_REQUIRED:
    case enums.ErrorsEnum.ORDER_LINE_ITEMS_ID_REQUIRED:
    case enums.ErrorsEnum.ORDER_LINE_ITEMS_PRICE_REQUIRED:
    case enums.ErrorsEnum.ORDER_LINE_ITEMS_QUANTITY_REQUIRED:
    case enums.ErrorsEnum.ORDER_LINE_ITEMS_SKU_CODE_REQUIRED:
        return {
            statusCode: 400,
            body: { message: error.message}
        }
    case enums.ErrorsEnum.ORDER_UPDATE_FAILED:
    case enums.ErrorsEnum.ORDER_CREATE_FAILED:
        return {
            statusCode: 500,
            body: { message: error.message}
        }
    default:
      return {
        statusCode: 500,
        body: { message: error.message},
      };
  }
};
