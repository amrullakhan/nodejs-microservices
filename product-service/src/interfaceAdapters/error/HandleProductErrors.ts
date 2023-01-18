import { HttpResponse } from "./../../useCases/interfaces";
import { enums } from "./../../entities/enums";

export const handleProductErrors = (error: any) :  HttpResponse => {
  switch (error.message) {
    case enums.ErrorsEnum.PRODUCT_NOT_FOUND:
      return {
        statusCode: 404,
        body: { message: "Product not found"},
      };
    case enums.ErrorsEnum.PRODUCT_ID_REQUIRED:
    case enums.ErrorsEnum.PRODUCT_NAME_REQUIRED:
    case enums.ErrorsEnum.PRODUCT_DESCRIPTION_REQUIRED:
    case enums.ErrorsEnum.PRODUCT_PRICE_REQUIRED:
        return {
            statusCode: 400,
            body: { message: error.message}
        }
    case enums.ErrorsEnum.PRODUCT_UPDATE_FAILED:
    case enums.ErrorsEnum.PRODUCT_CREATE_FAILED:
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
