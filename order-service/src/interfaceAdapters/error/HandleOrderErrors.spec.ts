import {handleProductErrors} from './HandleOrderErrors';
import {enums} from '../../entities/enums';

describe('HandleProductErrors', () => {
    it('should return a 404 status code if product not found', () => {
        const error = new Error(enums.ErrorsEnum.PRODUCT_NOT_FOUND);
        const response = handleProductErrors(error);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Product not found');
    });

    it('should return a 400 status code if product id is required', () => {
        const error = new Error(enums.ErrorsEnum.ORDER_ID_REQUIRED);
        const response = handleProductErrors(error);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(enums.ErrorsEnum.ORDER_ID_REQUIRED);
    });

    it('should return a 400 status code if product name is required', () => {
        const error = new Error(enums.ErrorsEnum.ORDER_NAME_REQUIRED);
        const response = handleProductErrors(error);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(enums.ErrorsEnum.ORDER_NAME_REQUIRED);
    });

    it('should return a 400 status code if product description is required', () => {
        const error = new Error(enums.ErrorsEnum.PRODUCT_DESCRIPTION_REQUIRED);
        const response = handleProductErrors(error);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(enums.ErrorsEnum.PRODUCT_DESCRIPTION_REQUIRED);
    });

    it('should return a 400 status code if product price is required', () => {
        const error = new Error(enums.ErrorsEnum.PRODUCT_PRICE_REQUIRED);
        const response = handleProductErrors(error);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(enums.ErrorsEnum.PRODUCT_PRICE_REQUIRED);
    });

    it('should return a 500 status code if product update failed', () => {
        const error = new Error(enums.ErrorsEnum.PRODUCT_UPDATE_FAILED);
        const response = handleProductErrors(error);

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe(enums.ErrorsEnum.PRODUCT_UPDATE_FAILED);
    });

    it('should return a 500 status code if product create failed', () => {
        const error = new Error(enums.ErrorsEnum.PRODUCT_CREATE_FAILED);
        const response = handleProductErrors(error);

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe(enums.ErrorsEnum.PRODUCT_CREATE_FAILED);
    });

    it('should return a 500 status code if an unknown error occurred', () => {
        const error = new Error('Unknown error');
        const response = handleProductErrors(error);

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Unknown error');
    });
});