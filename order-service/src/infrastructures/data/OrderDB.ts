import { Order } from "../../entities/models/Order";
import { MongoClient } from "mongodb";
import { OrderDBInterface, OrderRequest } from "useCases/interfaces";
import { enums } from "../../entities/enums";

export class OrderDB implements OrderDBInterface {
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

  async deleteOrder(id: string): Promise<boolean> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.deleteOne({ _id: id });

    return result.acknowledged && result.deletedCount === 1;
  }

  async updateOrder(id: string, newOrder: Order): Promise<Order> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const order = await collection.findOne({ _id: id });

    if (!order) {
      throw new Error(enums.ErrorsEnum.ORDER_NOT_FOUND);
    }

    const data = this.convertIdTo_Id(newOrder.toJson());
    delete data._id;

    const result = await collection.updateOne({ _id: id }, { $set: data });

    if (!result.acknowledged && result.modifiedCount !== 1) {
      throw new Error(enums.ErrorsEnum.ORDER_UPDATE_FAILED);
    }

    return newOrder;
  }

  async getOrders(): Promise<Order[]> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const orders = await collection.find().toArray();

    return orders.map((order: any) => {
      return Order.fromJson(
        this.convert_IdToId(JSON.parse(JSON.stringify(order)))
      );
    });
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const order = await collection.findOne({ _id: id });

    if (!order) {
      return undefined;
    }

    return Order.fromJson(
      this.convert_IdToId(JSON.parse(JSON.stringify(order)))
    );
  }

  async createOrder(order: Order): Promise<Order> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.insertOne(
      this.convertIdTo_Id(order.toJson())
    );
    if (!result.acknowledged) {
      throw new Error("Order creation failed");
    }

    return order;
  }
}
