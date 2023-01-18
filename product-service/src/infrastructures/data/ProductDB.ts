import { Product } from "./../../entities/models/Product";
import { MongoClient } from "mongodb";
import { ProductDBInterface, ProductRequest } from "useCases/interfaces";
import { enums } from "./../../entities/enums";

export class ProductDB implements ProductDBInterface {
  private client: MongoClient;
  private dbName: string;
  private collectionName: string;

  constructor(client: MongoClient, dbName: string, collectionName: string) {
    this.client = client;
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  convertIdTo_Id(data: any) {
    data._id = data.id;
    delete data.id;
    return data;
  }

  convert_IdToId(data: any) {
    data.id = data._id;
    delete data._id;
    return data;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.deleteOne({ _id: id });

    return result.acknowledged && result.deletedCount === 1;
  }

  async updateProduct(id: string, newProduct: Product): Promise<Product> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const product = await collection.findOne({ _id: id });

    if (!product) {
      throw new Error(enums.ErrorsEnum.PRODUCT_NOT_FOUND);
    }

    const data = this.convertIdTo_Id(newProduct.toJson());

    const result = await collection.updateOne({ _id: id }, { $set: data });

    if(!result.acknowledged && result.modifiedCount !== 1) {
        throw new Error(enums.ErrorsEnum.PRODUCT_UPDATE_FAILED);
    }

    return newProduct;
  }

  async getProducts(): Promise<Product[]> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const products = await collection.find().toArray();

    return products.map((product) => {
      return Product.fromJson(this.convert_IdToId(JSON.parse(JSON.stringify(product))));
    });
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const product = await collection.findOne({ _id: id });

    if (!product) {
      return undefined;
    }

    return Product.fromJson(this.convert_IdToId(JSON.parse(JSON.stringify(product))));
  }

  async createProduct(product: Product): Promise<Product> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.insertOne(this.convertIdTo_Id(product.toJson()));
    if (!result.acknowledged) {
      throw new Error("Product creation failed");
    }

    return product;
  }
}
