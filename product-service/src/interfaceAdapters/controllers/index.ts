import { ProductService } from "./../../useCases/services/ProductService";
import { ProductController } from "./ProductController";
import {errorHandlers} from "./../error";
import { IdHandler, productDB } from "./../../infrastructures/data";


const productService = new ProductService(productDB, IdHandler);

const productController = new ProductController(productService, errorHandlers.handleProductErrors);

export {
    productController,
};