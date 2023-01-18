export interface IdInterface {
    makeId: () => string;
    isValidId: (id: string) => boolean;
};
