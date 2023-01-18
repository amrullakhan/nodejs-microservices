import { ProductRequest } from "./ProductRequest";
import { ProductResponse } from "./ProductResponse";

export interface ProductServiceInterface {
    getProducts(): Promise<ProductResponse[]>;
    getProductById(id: string): Promise<ProductResponse | undefined>;
    createProduct(newProduct: ProductRequest): Promise<ProductResponse>;
    updateProduct(id: string, newProduct: ProductRequest): Promise<ProductResponse>;
    deleteProduct(id: string): Promise<string>;
}