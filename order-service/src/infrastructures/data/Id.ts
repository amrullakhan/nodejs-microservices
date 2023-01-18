import cuid from 'cuid';
import { IdInterface } from '../../useCases/interfaces';

export class Id implements IdInterface {
    makeId() {
        return cuid();
    }

    isValidId(id: string) {
        return cuid.isCuid(id);
    }
}
