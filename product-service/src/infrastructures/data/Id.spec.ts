import {Id} from './Id';

describe('Id', () => { 
    it('should return a valid id', () => {
        const id = new Id();
        const idValue = id.makeId();
        expect(id.isValidId(idValue)).toBe(true);
    });
 });