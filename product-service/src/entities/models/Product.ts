import { enums } from "./../enums";

export class Product {
    private id: string;
    private name: string;
    private description: string;
    private price: number;

    constructor(id: string, name: string, description: string, price: number) {

        // Validating inputs
        if(id === undefined || id === null || id === '') {
            throw new Error(enums.ErrorsEnum.PRODUCT_ID_REQUIRED);
        }

        if(name === undefined || name === null || name === '') {
            throw new Error(enums.ErrorsEnum.PRODUCT_NAME_REQUIRED);
        }

        if(description === undefined || description === null || description === '') {
            throw new Error(enums.ErrorsEnum.PRODUCT_DESCRIPTION_REQUIRED);
        }

        if(price === undefined || price === null || price <= 0) {
            throw new Error(enums.ErrorsEnum.PRODUCT_PRICE_REQUIRED);
        }

        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    static fromJson(json: any): Product {
        return new Product(json.id, json.name, json.description, json.price);
    }

    static fromJsonArray(json: any[]): Product[] {
        return json.map(Product.fromJson);
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price
        };
    }

    toString(): string {
        return `Product { id: ${this.id}, name: ${this.name}, description: ${this.description}, price: ${this.price} }`;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getPrice(): number {
        return this.price;
    }

}