import { Product } from "../../entities/models/Product";
import { ProductRequest } from "./ProductRequest";

export interface ProductDBInterface {
    createProduct(product: Product): Promise<Product>;
    getProductById(id: string): Promise<Product | undefined>;
    getProducts(): Promise<Product[]>;
    updateProduct(id: string, newProduct: Product): Promise<Product>;
    deleteProduct(id: string): Promise<boolean>;
}