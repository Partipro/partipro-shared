import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";

let mongod: MongoMemoryReplSet;

export const connect = async () => {
  mongod = await MongoMemoryReplSet.create({ replSet: { count: 2 } });
  const uri = mongod.getUri();

  mongoose.set("strict", "throw");
  await mongoose.connect(uri);
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
