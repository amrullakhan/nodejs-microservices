import { Inventory } from "../../entities/models/Inventory";
import { MongoClient } from "mongodb";
import { InventoryDBInterface, InventoryRequest } from "useCases/interfaces";
import { enums } from "../../entities/enums";

export class InventoryDB implements InventoryDBInterface {
  private client: MongoClient;
  private dbName: string;
  private collectionName: string;

  constructor(client: MongoClient, dbName: string, collectionName: string) {
    this.client = client;
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  async getInventoryBySkuCodes(codes: string[]): Promise<Inventory[]> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    
    const inventorys = await collection.find({ skuCode: { $in: codes}}).toArray();

    return inventorys.map((inventory: any) => {
      return Inventory.fromJson(this.convert_IdToId(JSON.parse(JSON.stringify(inventory))));
    });
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

  async deleteInventory(id: string): Promise<boolean> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.deleteOne({ _id: id });

    return result.acknowledged && result.deletedCount === 1;
  }

  async updateInventory(id: string, newInventory: Inventory): Promise<Inventory> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const inventory = await collection.findOne({ _id: id });

    if (!inventory) {
      throw new Error(enums.ErrorsEnum.INVENTORY_NOT_FOUND);
    }

    const data = this.convertIdTo_Id(newInventory.toJson());

    const result = await collection.updateOne({ _id: id }, { $set: data });

    if(!result.acknowledged && result.modifiedCount !== 1) {
        throw new Error(enums.ErrorsEnum.INVENTORY_UPDATE_FAILED);
    }

    return newInventory;
  }

  async getInventorys(): Promise<Inventory[]> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const inventorys = await collection.find().toArray();

    return inventorys.map((inventory: any) => {
      return Inventory.fromJson(this.convert_IdToId(JSON.parse(JSON.stringify(inventory))));
    });
  }

  async getInventoryById(id: string): Promise<Inventory | undefined> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const inventory = await collection.findOne({ _id: id });

    if (!inventory) {
      return undefined;
    }

    return Inventory.fromJson(this.convert_IdToId(JSON.parse(JSON.stringify(inventory))));
  }

  async createInventory(inventory: Inventory): Promise<Inventory> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.insertOne(this.convertIdTo_Id(inventory.toJson()));
    if (!result.acknowledged) {
      throw new Error("Inventory creation failed");
    }

    return inventory;
  }
}
