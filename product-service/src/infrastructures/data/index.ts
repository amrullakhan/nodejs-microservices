import { MongoClient } from "mongodb";
import { ProductDB } from "./ProductDB";
import {Id} from './Id';

const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB = process.env.MONGO_DB;
const MONGO_COLLECTION = process.env.MONGO_COLLECTION;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_AUTH_SOURCE = process.env.MONGO_AUTH_SOURCE;

if(!MONGO_URL) {
    throw new Error('MONGO_URL is not defined');
}

if(!MONGO_DB) {
    throw new Error('MONGO_DB is not defined');
}

if(!MONGO_COLLECTION) {
    throw new Error('MONGO_COLLECTION is not defined');
}

if(!MONGO_USER) {
    throw new Error('MONGO_USER is not defined');
}

if(!MONGO_PASSWORD) {
    throw new Error('MONGO_PASSWORD is not defined');
}

if(!MONGO_AUTH_SOURCE) {
    throw new Error('MONGO_AUTH_SOURCE is not defined');
}

// const uri =
//   "mongodb+srv://root:ugLKRPUPcbELg2SM@cluster0.lmcdr8h.mongodb.net/?retryWrites=true&w=majority";

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority&authSource=${MONGO_AUTH_SOURCE}`;

console.log(uri);
const client = new MongoClient(uri);

export const productDB = new ProductDB(client, MONGO_DB, MONGO_COLLECTION);

export const connectDB = async () => {
    await client.connect();
};

export const IdHandler = new Id();
