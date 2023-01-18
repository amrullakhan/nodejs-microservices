import { HttpResponse } from "../../useCases/interfaces";
import { enums } from "../../entities/enums";

export const handleInventoryErrors = (error: any) :  HttpResponse => {
  switch (error.message) {
    case enums.ErrorsEnum.INVENTORY_NOT_FOUND:
      return {
        statusCode: 404,
        body: { message: "Inventory not found"},
      };
    case enums.ErrorsEnum.INVENTORY_ID_REQUIRED:
    case enums.ErrorsEnum.INVENTORY_SKUCODE_REQUIRED:
    case enums.ErrorsEnum.INVENTORY_QUANTITY_REQUIRED:
        return {
            statusCode: 400,
            body: { message: error.message}
        }
    case enums.ErrorsEnum.INVENTORY_UPDATE_FAILED:
    case enums.ErrorsEnum.INVENTORY_CREATE_FAILED:
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
