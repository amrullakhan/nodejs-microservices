import {handleInventoryErrors} from './HandleInventoryErrors';
import {enums} from '../../entities/enums';

describe('HandleInventoryErrors', () => {
    it('should return a 404 status code if inventory not found', () => {
        const error = new Error(enums.ErrorsEnum.INVENTORY_NOT_FOUND);
        const response = handleInventoryErrors(error);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Inventory not found');
    });

    it('should return a 400 status code if inventory id is required', () => {
        const error = new Error(enums.ErrorsEnum.INVENTORY_ID_REQUIRED);
        const response = handleInventoryErrors(error);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(enums.ErrorsEnum.INVENTORY_ID_REQUIRED);
    });

    it('should return a 400 status code if inventory name is required', () => {
        const error = new Error(enums.ErrorsEnum.INVENTORY_SKUCODE_REQUIRED);
        const response = handleInventoryErrors(error);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(enums.ErrorsEnum.INVENTORY_SKUCODE_REQUIRED);
    });

    it('should return a 400 status code if inventory description is required', () => {
        const error = new Error(enums.ErrorsEnum.INVENTORY_QUANTITY_REQUIRED);
        const response = handleInventoryErrors(error);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(enums.ErrorsEnum.INVENTORY_QUANTITY_REQUIRED);
    });

    it('should return a 400 status code if inventory price is required', () => {
        const error = new Error(enums.ErrorsEnum.INVENTORY_PRICE_REQUIRED);
        const response = handleInventoryErrors(error);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(enums.ErrorsEnum.INVENTORY_PRICE_REQUIRED);
    });

    it('should return a 500 status code if inventory update failed', () => {
        const error = new Error(enums.ErrorsEnum.INVENTORY_UPDATE_FAILED);
        const response = handleInventoryErrors(error);

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe(enums.ErrorsEnum.INVENTORY_UPDATE_FAILED);
    });

    it('should return a 500 status code if inventory create failed', () => {
        const error = new Error(enums.ErrorsEnum.INVENTORY_CREATE_FAILED);
        const response = handleInventoryErrors(error);

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe(enums.ErrorsEnum.INVENTORY_CREATE_FAILED);
    });

    it('should return a 500 status code if an unknown error occurred', () => {
        const error = new Error('Unknown error');
        const response = handleInventoryErrors(error);

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Unknown error');
    });
});