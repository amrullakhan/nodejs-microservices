import { enums } from "./../../entities/enums";
import { ProductServiceInterface, ProductRequest, ProductResponse, ProductDBInterface, IdInterface } from "useCases/interfaces";
import { Product } from "./../../entities/models/Product";

export class ProductService implements ProductServiceInterface {
    private ProductDB: ProductDBInterface;
    private Id: IdInterface;

    constructor(ProductDB: ProductDBInterface, Id: IdInterface) {
        this.ProductDB = ProductDB;
        this.Id = Id;
    }

    productToResponse(product: Product): ProductResponse {
        return {
            id: product.getId(),
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
        };
    }

    async getProducts(): Promise<ProductResponse[]> {
        const products = await this.ProductDB.getProducts();
        return products.map((product) => {
            return this.productToResponse(product);
        });
    }

    async getProductById(id: string): Promise<ProductResponse | undefined> {
        const product = await this.ProductDB.getProductById(id);
        if (!product) {
            throw new Error(enums.ErrorsEnum.PRODUCT_NOT_FOUND);
        }

        return this.productToResponse(product);
    }

    async createProduct(newProduct: ProductRequest): Promise<ProductResponse> {
        const product = new Product(this.Id.makeId(), newProduct.name, newProduct.description, newProduct.price);

        try {
            await this.ProductDB.createProduct(product);
            return this.productToResponse(product);
        }
        catch(error) {
            console.log(error);
            throw new Error(enums.ErrorsEnum.PRODUCT_CREATE_FAILED);
        }
    }

    async updateProduct(id: string, newProduct: ProductRequest): Promise<ProductResponse> {
        const product = new Product(id, newProduct.name, newProduct.description, newProduct.price);
        try {
            await this.ProductDB.updateProduct(id, product);
            return this.productToResponse(product);
        } catch(e: any) {
            if(e.message === enums.ErrorsEnum.PRODUCT_NOT_FOUND) {
                throw new Error(enums.ErrorsEnum.PRODUCT_NOT_FOUND);
            }
            throw new Error(enums.ErrorsEnum.PRODUCT_UPDATE_FAILED);
        }
    }

    async deleteProduct(id: string): Promise<string> {
        const result = await this.ProductDB.deleteProduct(id);
        if(!result) {
            throw new Error(enums.ErrorsEnum.PRODUCT_DELETE_FAILED);
        }
        return `Product ${id} deleted`;
    }
}
